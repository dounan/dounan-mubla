import URI from 'urijs'
import * as api from '../api'
import * as insta from './instagram'

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

export const SET_INSTA_ACCESS_TOKEN = 'SET_INSTA_ACCESS_TOKEN';
export const setInstaAccessToken = (token) => ({
  type: SET_INSTA_ACCESS_TOKEN,
  token
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

export const instaAuth = () => (dispatch, getState) => {
  const u = new URI(window.location);
  u.hash("");
  const redirect = encodeURIComponent(u.toString());
  window.location = `${insta.OAUTH_URL}?client_id=${insta.CLIENT_ID}&redirect_uri=${redirect}&response_type=token`;
}

export const checkInstaAccessToken = () => (dispatch, getState) => {
  const u = new URI(window.location);
  const h = u.hash();
  let m;
  if (m = h.match(insta.ACCESS_TOKEN_REGEX)) {
    dispatch(setInstaAccessToken(m[2]));
    u.hash(h.replace(insta.ACCESS_TOKEN_REGEX, ''));
    window.location = u.toString();
  }
}

