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

function mapStateToProps(state, ownProps) {
  const {instagram, media} = state;
  const instaMaxId = get(media, 'instaPagination.maxId');
  return {
    instaToken: instagram.token,
    isLoadingPage: media.isFetching,
    isLoadingMore: media.isFetchingMore,
    mediaList: media.mediaList,
    hasMoreMedia: !!instaMaxId,
    instaMaxId: instaMaxId,
    canSelect: true,
    maxRowHeight: MAX_ROW_H,
    rowSpacing: SPACING,
    colSpacing: SPACING,
    // Set buffer to be larger than the scroll tile to give the new viewport
    // calculation some time. Creates a smoother looking scrolling experience.
    viewportBuffer: 2 * WINDOW_SCROLL_TILE_SIZE
  };
}

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMediaIds: Set()
    };
  }

  componentWillMount() {
    const {dispatch, instaToken} = this.props;
    if (instaToken) {
      dispatch(actions.loadMedia(instaToken));
    }
  }

  render() {
    const {selectedMediaIds} = this.state;
    return (
      <Browse {...this.props}
          selectedMediaIds={selectedMediaIds}
          onInstaAuthClick={this.instaAuth}
          onLoadMoreMedia={this.loadMoreMedia}
          onItemCheckClick={this.handleItemCheckClick} />
    );
  }

  instaAuth = () => {
    this.props.dispatch(actions.instaAuth());
  };

  loadMoreMedia = () => {
    const {dispatch, instaToken, instaMaxId} = this.props;
    dispatch(actions.moreMedia(instaToken, instaMaxId));
  };

  handleItemCheckClick = ({id}) => {
    const {selectedMediaIds} = this.state;
    const selected = selectedMediaIds.has(id)
        ? selectedMediaIds.delete(id)
        : selectedMediaIds.add(id);
    this.setState({selectedMediaIds: selected});
  };
}

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    windowScroll(WINDOW_SCROLL_TILE_SIZE, WINDOW_SCROLL_TILE_SIZE),
    connect(mapStateToProps)
)(Container);

