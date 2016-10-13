import debounce from 'lodash/debounce'
import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {compose} from "redux"
import * as actions from '../actions'
import SearchPage from './SearchPage'
import InstagramAuthWallContainer from './InstagramAuthWallContainer'
import windowScroll from './windowScroll'
import windowSize from './windowSize'

const MEDIA_STORE_KEY = 'search';
const SPACING = 8;
const MAX_ROW_H = 200;
const WINDOW_SIZE_DEBOUNCE_MS = 300;
const WINDOW_SCROLL_TILE_SIZE = 3 * MAX_ROW_H;

function showSearching(dispatch) {
  dispatch(actions.requestMedia(MEDIA_STORE_KEY));
}

function doSearch(dispatch, instaToken, searchQuery) {
  dispatch(actions.clearMedia(MEDIA_STORE_KEY));
  if (searchQuery) {
    dispatch(actions.searchMedia(MEDIA_STORE_KEY, instaToken, searchQuery));
  }
};

const debouncedDoSearch = debounce(doSearch, 400);

class Container extends Component {

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    const {dispatch, instaToken, searchQuery} = nextProps;
    if (searchQuery !== p.searchQuery) {
      // This prevents a weird state where the 'No results' view appears while
      // we are waiting for the debounced doSearch to run.
      showSearching(dispatch);
      debouncedDoSearch(dispatch, instaToken, searchQuery);
    }
  };

  render() {
    return (
      <SearchPage {...this.props} />
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    mediaStoreKey: MEDIA_STORE_KEY,
    instaToken: get(state, 'instagram.token'),
    searchQuery: get(ownProps, 'location.query.q', ''),
    maxRowHeight: MAX_ROW_H,
    rowSpacing: SPACING,
    colSpacing: SPACING,
    scrollX: ownProps.windowScrollX,
    scrollY: ownProps.windowScrollY,
    // Set buffer to be larger than the scroll tile to give the new viewport
    // calculation some time. Creates a smoother looking scrolling experience.
    viewportBuffer: 2 * WINDOW_SCROLL_TILE_SIZE
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {instaToken} = stateProps;
  const {dispatch} = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onInstagramToken: () => {
      if (instaToken) doSearch(dispatch, instaToken, stateProps.searchQuery);
    },
    onLoadMoreMedia: (pagination) => {
      dispatch(actions.moreSearchMedia(MEDIA_STORE_KEY, instaToken, pagination))
    }
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    windowScroll(WINDOW_SCROLL_TILE_SIZE, WINDOW_SCROLL_TILE_SIZE),
    connect(mapStateToProps, null, mergeProps)
)(Container);

