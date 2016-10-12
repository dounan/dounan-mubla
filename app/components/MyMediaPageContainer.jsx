import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {compose} from "redux"
import * as actions from '../actions'
import MyMediaPage from './MyMediaPage'
import windowScroll from './windowScroll'
import windowSize from './windowSize'

const MEDIA_STORE_KEY = 'myMedia';
const SPACING = 8;
const MAX_ROW_H = 200;
const WINDOW_SIZE_DEBOUNCE_MS = 300;
const WINDOW_SCROLL_TILE_SIZE = 3 * MAX_ROW_H;

function mapStateToProps(state, ownProps) {
  return {
    mediaStoreKey: MEDIA_STORE_KEY,
    instaToken: get(state, 'instagram.token'),
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
      if (instaToken) dispatch(actions.loadMedia(MEDIA_STORE_KEY, instaToken))
    },
    onLoadMoreMedia: (pagination) => {
      dispatch(actions.moreMedia(MEDIA_STORE_KEY, instaToken, pagination))
    }
  };
};

export default compose(
    windowSize(WINDOW_SIZE_DEBOUNCE_MS),
    windowScroll(WINDOW_SCROLL_TILE_SIZE, WINDOW_SCROLL_TILE_SIZE),
    connect(mapStateToProps, null, mergeProps)
)(MyMediaPage);

