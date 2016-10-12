import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import BrowseSelectedBar from './BrowseSelectedBar'

const MEDIA_KEY = 'browse';

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const media = mediaStore[MEDIA_KEY];
  return {
    numSelected: get(media, 'selectedMediaIds.size', 0)
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onCloseClick: () => dispatch(actions.deselectAllMedia(MEDIA_KEY)),
    // TODO: handle add to album
    onAddClick: () => {}
  };
};

export default connect(mapStateToProps, null, mergeProps)(BrowseSelectedBar);

