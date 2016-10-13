import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Browse from './Browse'

class Container extends Component {

  componentWillUnmount() {
    this.props.onDeselectAll();
  };

  render() {
    return (
      <Browse {...this.props} />
    );
  };
}

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const {mediaStoreKey} = ownProps;
  const media = get(mediaStore, mediaStoreKey, {});
  const mediaList = get(media, 'mediaList', []);
  const pagination = get(media, 'pagination', {});
  return {
    isLoadingPage: media.isFetching && mediaList.length === 0,
    isLoadingMore: media.isFetchingMore,
    mediaList: mediaList,
    hasMoreMedia: pagination.hasMore,
    canSelect: true,
    selectedMediaIds: media.selectedMediaIds
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {mediaStoreKey} = ownProps;
  return {
    onItemCheckClick: ({id}) => dispatch(actions.toggleSelectMedia(mediaStoreKey, id)),
    onDeselectAll: () => dispatch(actions.deselectAllMedia(mediaStoreKey))
  };
};

const BrowseContainer = connect(mapStateToProps, mapDispatchToProps)(Container);

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

