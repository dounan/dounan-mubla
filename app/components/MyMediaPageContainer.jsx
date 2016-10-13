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

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const media = get(mediaStore, MEDIA_STORE_KEY, {});
  const mediaList = get(media, 'mediaList', []);
  return {
    mediaList: mediaList,
    isLoadingPage: media.isFetching && mediaList.length === 0,
    isLoadingMore: media.isFetchingMore,
    canSelect: true,
    selectedMediaIds: media.selectedMediaIds,
    maxRowHeight: MAX_ROW_H,
    rowSpacing: SPACING,
    colSpacing: SPACING,
    viewportBuffer: WINDOW_SCROLL_TILE_SIZE
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onInstagramToken: (token) => {
      if (token) dispatch(actions.recentMedia(MEDIA_STORE_KEY));
    },
    onLoadMoreMedia: () => dispatch(actions.moreRecentMedia(MEDIA_STORE_KEY)),
    onItemCheckClick: ({id}) => dispatch(actions.toggleSelectMedia(MEDIA_STORE_KEY, id)),
    onDeselectAll: () => dispatch(actions.deselectAllMedia(MEDIA_STORE_KEY))
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    connect(mapStateToProps, mapDispatchToProps)
)(Container);

