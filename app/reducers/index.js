import {combineReducers} from "redux"
import {routerReducer} from 'react-router-redux'
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
}

function media(state={}, action) {
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
        instaPagination: action.instaPagination
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
        instaPagination: action.instaPagination
      };
  }
  return state;
}

export default combineReducers({
  instagram: instagram,
  media: media,
  routing: routerReducer,
});

