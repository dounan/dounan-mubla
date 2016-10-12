import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import NavBar from './NavBar'
import * as pt from './propTypes'

function mapStateToProps(state, ownProps) {
  const {routeLocation} = ownProps;
  const {pathname} = routeLocation;
  return {
    isMyMediaActive: pathname === '/',
    isAlbumsActive: pathname === '/albums'
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMyMediaClick: () => dispatch(actions.gotoMyMedia()),
    onAlbumsClick: () => dispatch(actions.gotoAlbumList())
  };
};

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

NavBarContainer.propTypes = {
  routeLocation: pt.ROUTE_LOCATION
};

export default NavBarContainer;

