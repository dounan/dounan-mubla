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
    this.loadMedia(this.props);
  };

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    if (nextProps.instaToken !== p.instaToken) {
      this.loadMedia(nextProps);
    }
  };

  render() {
    return (
      <Browse {...this.props} />
    );
  };

  loadMedia = (props) => {
    const {dispatch, instaToken} = props;
    if (instaToken) {
      dispatch(actions.loadMedia(instaToken));
    }
  };
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
  const pagination = get(media, 'pagination', {});
  return {
    _pagination: pagination,
    instaToken: instagram.token,
    isLoadingPage: media.isFetching,
    isLoadingMore: media.isFetchingMore,
    mediaList: media.mediaList,
    hasMoreMedia: pagination.hasMore,
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
  const {_pagination, instaToken} = stateProps;
  const {dispatch} = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onInstaAuthClick: () => dispatch(actions.instaAuth()),
    onLoadMoreMedia: () => dispatch(actions.moreMedia(instaToken, _pagination)),
    onItemCheckClick: toggleItemSelect.bind(null, stateProps, dispatch, ownProps)
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    windowScroll(WINDOW_SCROLL_TILE_SIZE, WINDOW_SCROLL_TILE_SIZE),
    connect(mapStateToProps, null, mergeProps)
)(Container);

