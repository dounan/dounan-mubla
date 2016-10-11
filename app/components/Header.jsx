import React, {Component, PropTypes} from 'react'
import NavBarContainer from './NavBarContainer'
import * as pt from './propTypes'
import jsvars from './vars'

const WRAPPER_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: jsvars.headerHeight,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
};

class Header extends Component {

  static propTypes = {
    routeLocation: pt.ROUTE_LOCATION
  }

  render() {
    const {routeLocation} = this.props;
    return (
      <div style={WRAPPER_STYLE}>
        <NavBarContainer routeLocation={routeLocation} />
      </div>
    );
  }
}

export default Header;

