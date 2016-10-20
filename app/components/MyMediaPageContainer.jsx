import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {compose} from "redux"
import * as actions from '../actions'
import MyMediaPage from './MyMediaPage'
import windowSize from './windowSize'

const MEDIA_STORE_KEY = 'myMedia';
const SPACING = 8;
const MAX_ROW_H = 200;
const WINDOW_SIZE_DEBOUNCE_MS = 300;
const WINDOW_SCROLL_TILE_SIZE = 3 * MAX_ROW_H;

class Container extends Component {

  componentWillUnmount() {
    this.props.onDeselectAll();
  };

  render() {
    return (
      <MyMediaPage {...this.props} />
    );
  };
}

function mediaIdx(mediaList, id) {
  if (!mediaList || !id) {
    return -1;
  }
  return findIndex(mediaList, {id});
}

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const media = get(mediaStore, MEDIA_STORE_KEY, {});
  const mediaList = get(media, 'mediaList', []);
  const mediaId = get(state, 'routing.locationBeforeTransitions.query.id');
  return {
    mediaList: mediaList,
    isLoadingPage: !!media.fetchId,
    isLoadingMore: !!media.fetchMoreId,
    canSelect: true,
    selectedMediaIds: media.selectedMediaIds,
    fullscreenMediaIdx: mediaIdx(mediaList, mediaId),
    maxRowHeight: MAX_ROW_H,
    rowSpacing: SPACING,
    colSpacing: SPACING,
    viewportBuffer: WINDOW_SCROLL_TILE_SIZE
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onInstagramToken: (token) => {
      if (token) dispatch(actions.recentMediaIfNone(MEDIA_STORE_KEY));
    },
    onLoadMoreMedia: () => dispatch(actions.moreRecentMedia(MEDIA_STORE_KEY)),
    onItemCheckClick: ({id}) => dispatch(actions.toggleSelectMedia(MEDIA_STORE_KEY, id)),
    onDeselectAll: () => dispatch(actions.deselectAllMedia(MEDIA_STORE_KEY)),
    onItemClick: ({id}) => dispatch(actions.addQueryParams({id})),
    onCloseFullscreenMedia: () => dispatch(actions.removeQueryParams('id'))
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    connect(mapStateToProps, mapDispatchToProps)
)(Container);

