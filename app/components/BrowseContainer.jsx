import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Browse from './Browse'

class Container extends Component {

  componentWillUnmount() {
    const {dispatch, mediaStoreKey} = this.props;
    dispatch(actions.deselectAllMedia(mediaStoreKey));
  };

  render() {
    return (
      <Browse {...this.props} />
    );
  };
}

function toggleItemSelect(stateProps, dispatch, ownProps, mediaItem) {
  const {selectedMediaIds} = stateProps;
  const {mediaStoreKey} = ownProps;
  const {id} = mediaItem;
  if (selectedMediaIds.has(id)) {
    dispatch(actions.deselectMedia(mediaStoreKey, [id]));
  } else {
    dispatch(actions.selectMedia(mediaStoreKey, [id]));
  }
};

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const {mediaStoreKey} = ownProps;
  const media = get(mediaStore, mediaStoreKey, {});
  const mediaList = get(media, 'mediaList', []);
  const pagination = get(media, 'pagination', {});
  return {
    _pagination: pagination,
    isLoadingPage: media.isFetching && mediaList.length === 0,
    isLoadingMore: media.isFetchingMore,
    mediaList: mediaList,
    hasMoreMedia: pagination.hasMore,
    canSelect: true,
    selectedMediaIds: media.selectedMediaIds
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {_pagination, ...otherStateProps} = stateProps;
  const {dispatch} = dispatchProps;
  return {
    ...ownProps,
    ...otherStateProps,
    ...dispatchProps,
    onLoadMoreMedia: () => ownProps.onLoadMoreMedia(_pagination),
    onItemCheckClick: toggleItemSelect.bind(null, stateProps, dispatch, ownProps)
  };
};

const BrowseContainer = connect(mapStateToProps, null, mergeProps)(Container);

BrowseContainer.propTypes = {
  mediaStoreKey: PropTypes.string.isRequired,
  // onLoadMoreMedia(pagination)
  onLoadMoreMedia: PropTypes.func.isRequired,

  emptyView: PropTypes.node,

  maxRowHeight: PropTypes.number.isRequired,
  rowSpacing: PropTypes.number,
  colSpacing: PropTypes.number,

  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  scrollX: PropTypes.number.isRequired,
  scrollY: PropTypes.number.isRequired,
  viewportBuffer: PropTypes.number.isRequired
};

export default BrowseContainer;

