import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import * as pt from './propTypes'

function mapStateToProps(state, ownProps) {
  const {mediaStore} = state;
  const myMedia = mediaStore.myMedia;
  return {
    myMediaSelectedBarVisible: get(myMedia, 'selectedMediaIds.size', 0) > 0
  };
};

const HeaderContainer = connect(mapStateToProps)(Header);

HeaderContainer.propTypes = {
  routeLocation: pt.ROUTE_LOCATION
};

export default HeaderContainer;

