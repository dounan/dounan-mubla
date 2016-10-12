import get from 'lodash/get'
import * as api from '../api'
import * as insta from './instagram'
import {push} from 'react-router-redux'
import * as persist from './persist'

////////////////////////////////////////////////////////////////////////////////
// Instagram Authentication
////////////////////////////////////////////////////////////////////////////////

const INSTA_TOKEN_SAVE_KEY = 'instaToken';

export const instaAuth = () => (dispatch, getState) => {
  window.location = insta.authUrl();
};

export const SET_INSTA_ACCESS_TOKEN = 'SET_INSTA_ACCESS_TOKEN';
export const setInstaAccessToken = (token) => (dispatch, getState) => {
  dispatch({
    type: SET_INSTA_ACCESS_TOKEN,
    token
  });
  persist.save(INSTA_TOKEN_SAVE_KEY, token || '');
};

export const restoreInstaAccessToken = () => (dispatch, getState) => {
  const token = persist.load(INSTA_TOKEN_SAVE_KEY);
  if (token) {
    dispatch(setInstaAccessToken(token));
  }
};

////////////////////////////////////////////////////////////////////////////////
// Media
////////////////////////////////////////////////////////////////////////////////

export const REQUEST_MEDIA = 'REQUEST_MEDIA';
const requestMedia = (mediaStoreKey) => ({
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

export const loadMedia = (mediaStoreKey, instaAccessToken) => (dispatch, getState) => {
  dispatch(requestMedia(mediaStoreKey));
  const params = {
    q: {
      'access_token': instaAccessToken,
      'count': 10
    }
  };
  dispatch(api.instaRecentMedia(params))
      .then(handleLoadMediaSuccess.bind(null, dispatch, mediaStoreKey));
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

export const moreMedia = (mediaStoreKey, instaAccessToken, pagination) => (dispatch, getState) => {
  dispatch(requestMoreMedia(mediaStoreKey));
  const params = {
    q: {
      'access_token': instaAccessToken,
      'max_id': get(pagination, 'instagram.next_max_id'),
      'count': 10
    }
  };
  dispatch(api.instaRecentMedia(params))
      .then(handleMoreMediaSuccess.bind(null, dispatch, mediaStoreKey));
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

export const DESELECT_ALL_MEDIA = 'DESELECT_ALL_MEDIA';
export const deselectAllMedia = (mediaStoreKey) => ({
  type: DESELECT_ALL_MEDIA,
  mediaStoreKey
});

////////////////////////////////////////////////////////////////////////////////
// Routing
////////////////////////////////////////////////////////////////////////////////

export const gotoMyMedia = () => push('/');

export const gotoAlbumList = () => push('/albums');

////////////////////////////////////////////////////////////////////////////////
// Misc
////////////////////////////////////////////////////////////////////////////////

export const notify = (level, message) => (dispatch, getState) => {
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

