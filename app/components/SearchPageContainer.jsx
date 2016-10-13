import debounce from 'lodash/debounce'
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

class Container extends Component {

  componentDidUpdate(prevProps, prevState) {
    const p = this.props;
    if (prevProps.searchQuery !== p.searchQuery) {
      p.onSearch();
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

const getSearchQuery = (ownProps) => get(ownProps, 'location.query.q', '');

function showSearching(dispatch) {
  dispatch(actions.requestMedia(MEDIA_STORE_KEY));
}

function doSearch(dispatch, searchQuery) {
  dispatch(actions.clearMedia(MEDIA_STORE_KEY));
  if (searchQuery) {
    dispatch(actions.searchMedia(MEDIA_STORE_KEY, searchQuery));
  }
};
const debouncedDoSearch = debounce(doSearch, 400);

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const media = get(mediaStore, MEDIA_STORE_KEY, {});
  const mediaList = get(media, 'mediaList', []);
  return {
    searchQuery: getSearchQuery(ownProps),
    mediaList: mediaList,
    isLoadingPage: media.isFetching && mediaList.length === 0,
    isLoadingMore: media.isFetchingMore,
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
      if (token) doSearch(dispatch, getSearchQuery(ownProps));
    },
    onSearch: () => {
      // This prevents a weird state where the 'No results' view appears while
      // we are waiting for the debounced doSearch to run.
      showSearching(dispatch);
      debouncedDoSearch(dispatch, getSearchQuery(ownProps));
    },
    onLoadMoreMedia: () => dispatch(actions.moreSearchMedia(MEDIA_STORE_KEY)),
    onItemCheckClick: ({id}) => dispatch(actions.toggleSelectMedia(MEDIA_STORE_KEY, id)),
    onDeselectAll: () => dispatch(actions.deselectAllMedia(MEDIA_STORE_KEY))
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    connect(mapStateToProps, mapDispatchToProps)
)(Container);

