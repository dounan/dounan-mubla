import get from 'lodash/get'
import * as api from '../api'
import * as insta from './instagram'
import {push} from 'react-router-redux'
import * as persist from './persist'

////////////////////////////////////////////////////////////////////////////////
// Instagram Authentication
////////////////////////////////////////////////////////////////////////////////

const INSTA_TOKEN_SAVE_KEY = 'instaToken';

export const instaAuth = () => (dispatch) => {
  window.location = insta.authUrl();
};

export const SET_INSTA_ACCESS_TOKEN = 'SET_INSTA_ACCESS_TOKEN';
export const setInstaAccessToken = (token) => (dispatch) => {
  dispatch({
    type: SET_INSTA_ACCESS_TOKEN,
    token
  });
  persist.save(INSTA_TOKEN_SAVE_KEY, token || '');
};

export const restoreInstaAccessToken = () => (dispatch) => {
  const token = persist.load(INSTA_TOKEN_SAVE_KEY);
  if (token) {
    dispatch(setInstaAccessToken(token));
  }
};

////////////////////////////////////////////////////////////////////////////////
// Media
////////////////////////////////////////////////////////////////////////////////

export const REQUEST_MEDIA = 'REQUEST_MEDIA';
export const requestMedia = (mediaStoreKey) => ({
  type: REQUEST_MEDIA,
  mediaStoreKey
});

export const RECEIVE_MEDIA = 'RECEIVE_MEDIA';
const receiveMedia = (mediaStoreKey, mediaList, pagination) => ({
  type: RECEIVE_MEDIA,
  mediaStoreKey,
  mediaList,
  pagination
});

export const REQUEST_MEDIA_ERROR = 'REQUEST_MEDIA_ERROR';
const requestMediaError = (mediaStoreKey) => ({
  type: REQUEST_MEDIA_ERROR,
  mediaStoreKey
});

export const REQUEST_MORE_MEDIA = 'REQUEST_MORE_MEDIA';
const requestMoreMedia = (mediaStoreKey) => ({
  type: REQUEST_MORE_MEDIA,
  mediaStoreKey
});

export const RECEIVE_MORE_MEDIA = 'RECEIVE_MORE_MEDIA';
const receiveMoreMedia = (mediaStoreKey, mediaList, pagination) => ({
  type: RECEIVE_MORE_MEDIA,
  mediaList,
  pagination,
  mediaStoreKey
});

export const REQUEST_MORE_MEDIA_ERROR = 'REQUEST_MORE_MEDIA_ERROR';
const requestMoreMediaError = (mediaStoreKey) => ({
  type: REQUEST_MORE_MEDIA_ERROR,
  mediaStoreKey
});

export const recentMedia = (mediaStoreKey) => (dispatch, getState) => {
  const state = getState();
  const instaToken = state.instagram.token;
  if (!instaToken) {
    // TODO: warn
    return;
  }
  dispatch(requestMedia(mediaStoreKey));
  const params = {
    q: {
      'access_token': state.instagram.token,
      'count': 5
    }
  };
  // TODO: handle rejected Promise
  dispatch(api.instaRecentMedia(params))
      .then(handleLoadMediaSuccess.bind(null, dispatch, mediaStoreKey));
};

export const moreRecentMedia = (mediaStoreKey) => (dispatch, getState) => {
  const state = getState();
  const instaToken = state.instagram.token;
  const media = state.mediaStore[mediaStoreKey];
  if (!get(media, 'pagination.hasMore') || media.isFetching || media.isFetchingMore) {
    return;
  }
  const maxId = get(media, 'pagination.instagram.next_max_id');
  if (!instaToken || !maxId) {
    // TODO: warn
    return;
  }
  dispatch(requestMoreMedia(mediaStoreKey));
  const params = {
    q: {
      'access_token': instaToken,
      'max_id': maxId,
      'count': 5
    }
  };
  // TODO: handle rejected Promise
  dispatch(api.instaRecentMedia(params))
      .then(handleMoreMediaSuccess.bind(null, dispatch, mediaStoreKey));
};

export const searchMedia = (mediaStoreKey, query) => (dispatch, getState) => {
  const state = getState();
  const instaToken = state.instagram.token;
  if (!instaToken) {
    // TODO: warn
    return;
  }
  dispatch(requestMedia(mediaStoreKey));
  const params = {
    q: {
      'access_token': instaToken,
      'q': query
    }
  };
  // TODO: handle rejected Promise
  dispatch(api.instaSearchTags(params))
      .then(handleInstaSearchTagSuccess.bind(null, dispatch, mediaStoreKey, instaToken))
      .then(handleLoadMediaSuccess.bind(null, dispatch, mediaStoreKey));
};

export const moreSearchMedia = (mediaStoreKey) => (dispatch, getState) => {
  const state = getState();
  const instaToken = state.instagram.token;
  const media = state.mediaStore[mediaStoreKey];
  if (!get(media, 'pagination.hasMore') || media.isFetching || media.isFetchingMore) {
    return;
  }
  const maxTagId = get(media, 'pagination.instagram.next_max_tag_id');
  const tagName = get(media, 'pagination.instagram.tagName');
  if (!instaToken || !maxTagId) {
    // TODO: warn
    return;
  }
  dispatch(requestMoreMedia(mediaStoreKey));
  const queryParams = {
    'access_token': instaToken,
    'max_tag_id': maxTagId,
    'count': 5
  };
  // TODO: handle rejected Promise
  instaRecentTagMedia(dispatch, tagName, queryParams)
      .then(handleMoreMediaSuccess.bind(null, dispatch, mediaStoreKey));
};

function handleInstaSearchTagSuccess(dispatch, mediaStoreKey, instaToken, result) {
  const instaBody = result.body;
  const tagName = insta.extractTopTagName(instaBody);
  if (insta.isSuccess(instaBody) && tagName) {
    const queryParams = {
      'access_token': instaToken,
      'count': 5
    };
    // TODO: handle rejected Promise
    return instaRecentTagMedia(dispatch, tagName, queryParams);
  } else if (!tagName) {
    return {body: insta.emptyBody()};
  } else {
    return result;
  }
};

function instaRecentTagMedia(dispatch, tagName, queryParams) {
  const params = {
    q: queryParams,
    tagName
  };
  return dispatch(api.instaRecentTagMedia(params))
      .then(result => ({
        ...result,
        body: insta.addPaginationData(result.body, {tagName})
      }));
};

function handleLoadMediaSuccess(dispatch, mediaStoreKey, result) {
  const instaBody = result.body;
  if (insta.isSuccess(instaBody)) {
    const mediaList = insta.extractMediaList(instaBody);
    const pagination = {
      hasMore: insta.hasMore(instaBody),
      instagram: insta.extractPagination(instaBody)
    };
    dispatch(receiveMedia(mediaStoreKey, mediaList, pagination));
  } else {
    dispatch(requestMediaError(mediaStoreKey));
    handleInstaError(dispatch, instaBody);
  }
};

function handleMoreMediaSuccess(dispatch, mediaStoreKey, result) {
  const instaBody = result.body;
  if (insta.isSuccess(instaBody)) {
    const mediaList = insta.extractMediaList(instaBody);
    const pagination = {
      hasMore: insta.hasMore(instaBody),
      instagram: insta.extractPagination(instaBody)
    };
    dispatch(receiveMoreMedia(mediaStoreKey, mediaList, pagination));
  } else {
    dispatch(requestMoreMediaError(mediaStoreKey));
    handleInstaError(dispatch, instaBody);
  }
};

function handleInstaError(dispatch, instaBody) {
  if (get(instaBody, 'meta.error_type') === 'OAuthAccessTokenException') {
    dispatch(setInstaAccessToken(null));
  } else {
    dispatch(notify('error', get(instaBody, 'meta.error_message')));
  }
};

export const SELECT_MEDIA = 'SELECT_MEDIA';
export const selectMedia = (mediaStoreKey, mediaIds) => ({
  type: SELECT_MEDIA,
  mediaStoreKey, 
  mediaIds
});

export const DESELECT_MEDIA = 'DESELECT_MEDIA';
export const deselectMedia = (mediaStoreKey, mediaIds) => ({
  type: DESELECT_MEDIA,
  mediaStoreKey, 
  mediaIds
});

export const TOGGLE_SELECT_MEDIA = 'TOGGLE_SELECT_MEDIA';
export const toggleSelectMedia = (mediaStoreKey, mediaId) => (dispatch, getState) => {
  const state = getState();
  const media = state.mediaStore[mediaStoreKey];
  const selectedMediaIds = get(media, 'selectedMediaIds');
  if (selectedMediaIds.has(mediaId)) {
    dispatch(deselectMedia(mediaStoreKey, [mediaId]));
  } else {
    dispatch(selectMedia(mediaStoreKey, [mediaId]));
  }
};

export const DESELECT_ALL_MEDIA = 'DESELECT_ALL_MEDIA';
export const deselectAllMedia = (mediaStoreKey) => ({
  type: DESELECT_ALL_MEDIA,
  mediaStoreKey
});

export const CLEAR_MEDIA = 'CLEAR_MEDIA';
export const clearMedia = (mediaStoreKey) => ({
  type: CLEAR_MEDIA,
  mediaStoreKey
});

////////////////////////////////////////////////////////////////////////////////
// Routing
////////////////////////////////////////////////////////////////////////////////

export const gotoMyMedia = () => push('/');

export const gotoSearch = (queryParams=null) => push({pathname: '/search', query:queryParams});

export const gotoAlbumList = () => push('/albums');

////////////////////////////////////////////////////////////////////////////////
// Misc
////////////////////////////////////////////////////////////////////////////////

export const notify = (level, message) => (dispatch) => {
  alert(message);
};

////////////////////////////////////////////////////////////////////////////////
// Debug actions
////////////////////////////////////////////////////////////////////////////////

export const EXTEND_MEDIA_LIST = 'EXTEND_MEDIA_LIST';
export const extendMediaList = (mediaStoreKey, numItems) => ({
  type: EXTEND_MEDIA_LIST,
  mediaStoreKey,
  numItems
});

export const RANDOMIZE_MEDIA_ASPECT_RATIOS = 'RANDOMIZE_MEDIA_ASPECT_RATIOS';
export const randomizeMediaAspectRatios = (mediaStoreKey, min, max) => ({
  type: RANDOMIZE_MEDIA_ASPECT_RATIOS,
  mediaStoreKey,
  min,
  max
});

