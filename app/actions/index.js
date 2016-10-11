import URI from 'urijs'
import * as api from '../api'
import * as insta from './instagram'
import {push} from 'react-router-redux'

////////////////////////////////////////////////////////////////////////////////
// Instagram Authentication
////////////////////////////////////////////////////////////////////////////////

export const instaAuth = () => (dispatch, getState) => {
  const u = new URI(window.location);
  u.hash("");
  const redirect = encodeURIComponent(u.toString());
  window.location = `${insta.OAUTH_URL}?client_id=${insta.CLIENT_ID}&redirect_uri=${redirect}&response_type=token`;
}

export const SET_INSTA_ACCESS_TOKEN = 'SET_INSTA_ACCESS_TOKEN';
export const setInstaAccessToken = (token) => ({
  type: SET_INSTA_ACCESS_TOKEN,
  token
});

////////////////////////////////////////////////////////////////////////////////
// Media
////////////////////////////////////////////////////////////////////////////////

export const REQUEST_MEDIA = 'REQUEST_MEDIA';
const requestMedia = () => ({
  type: REQUEST_MEDIA
});

export const RECEIVE_MEDIA = 'RECEIVE_MEDIA';
const receiveMedia = (mediaList, instaPagination) => ({
  type: RECEIVE_MEDIA,
  mediaList,
  instaPagination
});

export const REQUEST_MORE_MEDIA = 'REQUEST_MORE_MEDIA';
const requestMoreMedia = () => ({
  type: REQUEST_MORE_MEDIA
});

export const RECEIVE_MORE_MEDIA = 'RECEIVE_MORE_MEDIA';
const receiveMoreMedia = (mediaList, instaPagination) => ({
  type: RECEIVE_MORE_MEDIA,
  mediaList,
  instaPagination
});

export const loadMedia = (instaAccessToken) => (dispatch, getState) => {
  dispatch(requestMedia());
  const params = {
    q: {
      'access_token': instaAccessToken,
      'count': 10
    }
  };
  return dispatch(api.instaRecentMedia(params))
      .then(handleLoadMediaSuccess.bind(null, dispatch));
}

function handleLoadMediaSuccess(dispatch, result) {
  const instaBody = result.body;
  if (insta.isSuccess(instaBody)) {
    const mediaList = insta.extractMediaList(instaBody);
    const instaPagination = insta.extractPagination(instaBody);
    dispatch(receiveMedia(mediaList, instaPagination));
  } else {
    handleInstaError(instaBody);
  }
}

export const moreMedia = (instaAccessToken, instaMaxId) => (dispatch, getState) => {
  dispatch(requestMoreMedia());
  const params = {
    q: {
      'access_token': instaAccessToken,
      'max_id': instaMaxId,
      'count': 10
    }
  };
  return dispatch(api.instaRecentMedia(params))
      .then(handleMoreMediaSuccess.bind(null, dispatch));
}

function handleMoreMediaSuccess(dispatch, result) {
  const instaBody = result.body;
  if (insta.isSuccess(instaBody)) {
    const mediaList = insta.extractMediaList(instaBody);
    const instaPagination = insta.extractPagination(instaBody);
    dispatch(receiveMoreMedia(mediaList, instaPagination));
  } else {
    handleInstaError(instaBody);
  }
}

function handleInstaError(instaBody) {
  throw Error("TODO: handle non 200 instagram response");
}

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

