import React, {Component, PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import NavBarContainer from './NavBarContainer'
import BrowseSelectedBarContainer from './BrowseSelectedBarContainer'
import css from './Header.css'
import * as pt from './propTypes'
import jsvars from './vars'

const WRAPPER_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: jsvars.headerHeight,
  zIndex: 100,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
};

class Header extends Component {

  static propTypes = {
    routeLocation: pt.ROUTE_LOCATION,
    myMediaSelectedBarVisible: PropTypes.bool,
    searchSelectedBarVisible: PropTypes.bool
  };

  render() {
    const p = this.props;
    const transitionName = {
      appear: css.animEnter,
      appearActive: css.animEnterActive,
      enter: css.animEnter,
      enterActive: css.animEnterActive,
      leave: css.animLeave,
      leaveActive: css.animLeaveActive
    };
    return (
      <div style={WRAPPER_STYLE}>
        <NavBarContainer routeLocation={p.routeLocation} />
        <ReactCSSTransitionGroup
            transitionName={transitionName}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
          {this.renderMyMediaSelected()}
          {this.renderSearchSelected()}
        </ReactCSSTransitionGroup>
      </div>
    );
  };

  renderMyMediaSelected = () => {
    const p = this.props;
    if (!p.myMediaSelectedBarVisible) {
      return null;
    }
    return (
      <div className={css.cover}>
        <BrowseSelectedBarContainer mediaStoreKey='myMedia' />
      </div>
    );
  };

  renderSearchSelected = () => {
    const p = this.props;
    if (!p.searchSelectedBarVisible) {
      return null;
    }
    return (
      <div className={css.cover}>
        <BrowseSelectedBarContainer mediaStoreKey='search' />
      </div>
    );
  };
}

export default Header;

