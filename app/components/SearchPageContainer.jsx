import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {compose} from "redux"
import * as actions from '../actions'
import SearchPage from './SearchPage'
import InstagramAuthWallContainer from './InstagramAuthWallContainer'
import windowSize from './windowSize'

const MEDIA_STORE_KEY = 'search';
const SPACING = 8;
const MAX_ROW_H = 200;
const WINDOW_SIZE_DEBOUNCE_MS = 300;
const SCROLL_TILE_SIZE = 3 * MAX_ROW_H;

function doSearch(dispatch) {
  dispatch(actions.doSearch(MEDIA_STORE_KEY));
};

class Container extends Component {

  componentDidUpdate(prevProps, prevState) {
    const p = this.props;
    if (prevProps.searchQuery !== p.searchQuery) {
      p.onSearchChange();
    }
  };

  componentWillUnmount() {
    this.props.onDeselectAll();
  };

  render() {
    return (
      <SearchPage {...this.props} />
    );
  };
}

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const media = get(mediaStore, MEDIA_STORE_KEY, {});
  const mediaList = get(media, 'mediaList', []);
  return {
    searchQuery: get(ownProps, 'location.query.q', ''),
    mediaList: mediaList,
    isLoadingPage: media.fetchId,
    isLoadingMore: !!media.fetchMoreId,
    canSelect: true,
    selectedMediaIds: media.selectedMediaIds,
    maxRowHeight: MAX_ROW_H,
    rowSpacing: SPACING,
    colSpacing: SPACING,
    viewportBuffer: SCROLL_TILE_SIZE
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onInstagramToken: (token) => {
      if (token) doSearch(dispatch);
    },
    onSearchChange: () => doSearch(dispatch),
    onLoadMoreMedia: () => dispatch(actions.moreSearchMedia(MEDIA_STORE_KEY)),
    onItemCheckClick: ({id}) => dispatch(actions.toggleSelectMedia(MEDIA_STORE_KEY, id)),
    onDeselectAll: () => dispatch(actions.deselectAllMedia(MEDIA_STORE_KEY))
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    connect(mapStateToProps, mapDispatchToProps)
)(Container);

