import {Set} from 'immutable'
import {combineReducers} from "redux"
import {routerReducer} from 'react-router-redux'
import uuid from 'node-uuid'
import * as actions from '../actions'

function instagram(state={}, action) {
  switch (action.type) {
    case actions.SET_INSTA_ACCESS_TOKEN:
      return {
        ...state,
        token: action.token
      };
  }
  return state;
};

const INIT_MEDIA = {
  mediaList: [],
  pagination: {},
  selectedMediaIds: Set()
};

function mediaHelper(state=INIT_MEDIA, action) {
  switch (action.type) {
    case actions.REQUEST_MEDIA:
      return {
        ...state,
        isFetching: true
      };
    case actions.RECEIVE_MEDIA:
      return {
        ...state,
        isFetching: false,
        mediaList: action.mediaList,
        pagination: action.pagination,
        selectedMediaIds: Set()
      };
    case actions.REQUEST_MEDIA_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case actions.REQUEST_MORE_MEDIA:
      return {
        ...state,
        isFetchingMore: true
      };
    case actions.RECEIVE_MORE_MEDIA:
      return {
        ...state,
        isFetchingMore: false,
        mediaList: state.mediaList.concat(action.mediaList),
        pagination: action.pagination
      };
    case actions.REQUEST_MORE_MEDIA_ERROR:
      return {
        ...state,
        isFetchingMore: false
      };
    case actions.SELECT_MEDIA:
      return {
        ...state,
        selectedMediaIds: state.selectedMediaIds.union(action.mediaIds)
      }
    case actions.DESELECT_MEDIA:
      return {
        ...state,
        selectedMediaIds: state.selectedMediaIds.subtract(action.mediaIds)
      }
    case actions.DESELECT_ALL_MEDIA:
      return {
        ...state,
        selectedMediaIds: Set()
      }
    case actions.CLEAR_MEDIA:
      return {
        ...state,
        mediaList: [],
        pagination: {},
        selectedMediaIds: Set()
      };
    case actions.EXTEND_MEDIA_LIST:
      return {
        ...state,
        mediaList: extendMediaList(state.mediaList, action.numItems)
      };
    case actions.RANDOMIZE_MEDIA_ASPECT_RATIOS:
      const {min, max} = action;
      return {
        ...state,
        mediaList: randomizeMediaListAspectRatios(min, max, state.mediaList)
      };
  }
  return state;
};

function mediaStore(state={}, action) {
  if (action.mediaStoreKey) {
    return {
      ...state,
      [action.mediaStoreKey]: mediaHelper(state[action.mediaStoreKey], action)
    }
  }
  return state;
};

function cloneMedia(media) {
  const newMedia = JSON.parse(JSON.stringify(media));
  newMedia.id = uuid.v4();
  return newMedia;
};

function extendMediaList(mediaList, numItems) {
  if (!mediaList) {
    return mediaList;
  }
  const n = mediaList.length;
  let items = [];
  for (let i = 0; i < numItems; i++) {
    const media = i < n ? mediaList[i] : cloneMedia(mediaList[i % n]);
    items.push(media);
  }
  return items;
};

function rand(min, max) {
  return Math.random() * (max - min) + min;
};

function randomizeMediaListAspectRatios(min, max, mediaList) {
  if (!mediaList) {
    return mediaList;
  }
  // Mutate media and put into a new array for efficiency.
  // Otherwise cloning and storing a copy of media list in memory can crash
  // the browser for very large media lists (e.g. > 100,000 items).
  let items = [];
  for (let i in mediaList) {
    items.push(randomizeAspectRatio(min, max, mediaList[i]));
  }
  return items;
};

function randomizeAspectRatio(min, max, media) {
  const images = media.images;
  const r = rand(min, max);
  for (let i in images) {
    const img = images[i];
    if (r < 1) {
      img.width = img.height * r;
    } else {
      img.height = img.width / r;
    }
  }
  return media;
};

export default combineReducers({
  instagram,
  mediaStore,
  routing: routerReducer
});

