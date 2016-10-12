import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import BrowseSelectedBar from './BrowseSelectedBar'

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const {mediaStoreKey} = ownProps;
  const media = mediaStore[mediaStoreKey];
  return {
    numSelected: get(media, 'selectedMediaIds.size', 0)
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const {mediaStoreKey} = ownProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onCloseClick: () => dispatch(actions.deselectAllMedia(mediaStoreKey)),
    // TODO: handle add to album
    onAddClick: () => {}
  };
};

const BrowseSelectedBarContainer = connect(mapStateToProps, null, mergeProps)(BrowseSelectedBar);

BrowseSelectedBar.propTypes = {
  mediaStoreKey: PropTypes.string.isRequired,
};

export default BrowseSelectedBarContainer;

