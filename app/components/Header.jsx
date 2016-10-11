import React, {Component, PropTypes} from 'react'
import NavBarContainer from './NavBarContainer'
import BrowseSelectedBarContainer from './BrowseSelectedBarContainer'
import * as pt from './propTypes'
import jsvars from './vars'
import Visible from './Visible'

const WRAPPER_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: jsvars.headerHeight,
  zIndex: 100,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
};

const COVER_STYLE = {
  position: 'absolute',
  top: 0, 
  left: 0,
  width: '100%',
  height: '100%'
};

class Header extends Component {

  static propTypes = {
    routeLocation: pt.ROUTE_LOCATION,
    browseSelectedBarVisible: PropTypes.bool
  }

  render() {
    const p = this.props;
    return (
      <div style={WRAPPER_STYLE}>
        <NavBarContainer routeLocation={p.routeLocation} />
        <Visible visible={p.browseSelectedBarVisible} style={COVER_STYLE}>
          <BrowseSelectedBarContainer />
        </Visible>
      </div>
    );
  }
}

export default Header;

