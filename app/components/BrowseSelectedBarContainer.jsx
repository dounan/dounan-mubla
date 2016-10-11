import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import BrowseSelectedBar from './BrowseSelectedBar'

function mapStateToProps(state, ownProps) {
  const {browse} = state;
  return {
    numSelected: get(browse, 'selectedMediaIds.size', 0)
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onCloseClick: () => dispatch(actions.browseDeselectAllMedia()),
    // TODO: handle add to album
    onAddClick: () => {}
  };
};

export default connect(mapStateToProps, null, mergeProps)(BrowseSelectedBar);

