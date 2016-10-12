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
const requestMedia = () => ({
  type: REQUEST_MEDIA
});

export const RECEIVE_MEDIA = 'RECEIVE_MEDIA';
const receiveMedia = (mediaList, pagination) => ({
  type: RECEIVE_MEDIA,
  mediaList,
  pagination
});

export const REQUEST_MEDIA_ERROR = 'REQUEST_MEDIA_ERROR';
const requestMediaError = () => ({
  type: REQUEST_MEDIA_ERROR
});

export const REQUEST_MORE_MEDIA = 'REQUEST_MORE_MEDIA';
const requestMoreMedia = () => ({
  type: REQUEST_MORE_MEDIA
});

export const RECEIVE_MORE_MEDIA = 'RECEIVE_MORE_MEDIA';
const receiveMoreMedia = (mediaList, pagination) => ({
  type: RECEIVE_MORE_MEDIA,
  mediaList,
  pagination
});

export const REQUEST_MORE_MEDIA_ERROR = 'REQUEST_MORE_MEDIA_ERROR';
const requestMoreMediaError = () => ({
  type: REQUEST_MORE_MEDIA_ERROR
});

export const loadMedia = (instaAccessToken) => (dispatch, getState) => {
  dispatch(requestMedia());
  const params = {
    q: {
      'access_token': instaAccessToken,
      'count': 10
    }
  };
  dispatch(api.instaRecentMedia(params))
      .then(handleLoadMediaSuccess.bind(null, dispatch));
};

function handleLoadMediaSuccess(dispatch, result) {
  const instaBody = result.body;
  if (insta.isSuccess(instaBody)) {
    const mediaList = insta.extractMediaList(instaBody);
    const pagination = {
      hasMore: insta.hasMore(instaBody),
      instagram: insta.extractPagination(instaBody)
    };
    dispatch(receiveMedia(mediaList, pagination));
  } else {
    dispatch(requestMediaError());
    handleInstaError(dispatch, instaBody);
  }
};

export const moreMedia = (instaAccessToken, pagination) => (dispatch, getState) => {
  dispatch(requestMoreMedia());
  const params = {
    q: {
      'access_token': instaAccessToken,
      'max_id': get(pagination, 'instagram.next_max_id'),
      'count': 10
    }
  };
  dispatch(api.instaRecentMedia(params))
      .then(handleMoreMediaSuccess.bind(null, dispatch));
};

function handleMoreMediaSuccess(dispatch, result) {
  const instaBody = result.body;
  if (insta.isSuccess(instaBody)) {
    const mediaList = insta.extractMediaList(instaBody);
    const pagination = {
      hasMore: insta.hasMore(instaBody),
      instagram: insta.extractPagination(instaBody)
    };
    dispatch(receiveMoreMedia(mediaList, pagination));
  } else {
    dispatch(requestMoreMediaError());
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

////////////////////////////////////////////////////////////////////////////////
// Browse page
////////////////////////////////////////////////////////////////////////////////

export const BROWSE_SELECT_MEDIA = 'BROWSE_SELECT_MEDIA';
export const browseSelectMedia = (mediaIds) => ({
  type: BROWSE_SELECT_MEDIA,
  mediaIds
});

export const BROWSE_DESELECT_MEDIA = 'BROWSE_DESELECT_MEDIA';
export const browseDeselectMedia = (mediaIds) => ({
  type: BROWSE_DESELECT_MEDIA,
  mediaIds
});

export const BROWSE_DESELECT_ALL_MEDIA = 'BROWSE_DESELECT_ALL_MEDIA';
export const browseDeselectAllMedia = () => ({
  type: BROWSE_DESELECT_ALL_MEDIA,
});

////////////////////////////////////////////////////////////////////////////////
// Routing
////////////////////////////////////////////////////////////////////////////////

export const gotoBrowse = () => push('/');

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
export const extendMediaList = (numItems) => ({
  type: EXTEND_MEDIA_LIST,
  numItems
});

export const RANDOMIZE_MEDIA_ASPECT_RATIOS = 'RANDOMIZE_MEDIA_ASPECT_RATIOS';
export const randomizeMediaAspectRatios = (min, max) => ({
  type: RANDOMIZE_MEDIA_ASPECT_RATIOS,
  min,
  max
});

