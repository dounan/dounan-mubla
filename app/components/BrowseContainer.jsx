import {Set} from 'immutable'
import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {compose} from "redux"
import * as actions from '../actions'
import * as api from '../api'
import Browse from './Browse'
import windowScroll from './windowScroll'
import windowSize from './windowSize'

const SPACING = 8;
const MAX_ROW_H = 200;
const WINDOW_SIZE_DEBOUNCE_MS = 300;
const WINDOW_SCROLL_TILE_SIZE = 3 * MAX_ROW_H;

class Container extends Component {

  componentWillMount() {
    const {dispatch, instaToken} = this.props;
    if (instaToken) {
      dispatch(actions.loadMedia(instaToken));
    }
  }

  render() {
    return (
      <Browse {...this.props} />
    );
  }
}

function toggleItemSelect(stateProps, dispatch, ownProps, media) {
  const {selectedMediaIds} = stateProps;
  const {id} = media;
  if (selectedMediaIds.has(id)) {
    dispatch(actions.browseDeselectMedia([id]));
  } else {
    dispatch(actions.browseSelectMedia([id]));
  }
};

function mapStateToProps(state, ownProps) {
  const {instagram, media, browse} = state;
  const instaMaxId = get(media, 'instaPagination.maxId');
  return {
    instaToken: instagram.token,
    isLoadingPage: media.isFetching,
    isLoadingMore: media.isFetchingMore,
    mediaList: media.mediaList,
    hasMoreMedia: !!instaMaxId,
    instaMaxId: instaMaxId,
    canSelect: true,
    selectedMediaIds: browse.selectedMediaIds,
    maxRowHeight: MAX_ROW_H,
    rowSpacing: SPACING,
    colSpacing: SPACING,
    // Set buffer to be larger than the scroll tile to give the new viewport
    // calculation some time. Creates a smoother looking scrolling experience.
    viewportBuffer: 2 * WINDOW_SCROLL_TILE_SIZE
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {instaToken, instaMaxId} = stateProps;
  const {dispatch} = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onInstaAuthClick: () => dispatch(actions.instaAuth()),
    onLoadMoreMedia: () => dispatch(actions.moreMedia(instaToken, instaMaxId)),
    onItemCheckClick: toggleItemSelect.bind(null, stateProps, dispatch, ownProps)
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    windowScroll(WINDOW_SCROLL_TILE_SIZE, WINDOW_SCROLL_TILE_SIZE),
    connect(mapStateToProps, null, mergeProps)
)(Container);

