import React, {Component, PropTypes} from 'react'
import HeaderContainer from './HeaderContainer'
import * as pt from './propTypes'

class Root extends Component {

  static propTypes = {
    routeLocation: pt.ROUTE_LOCATION
  };

  render() {
    const {routeLocation, children} = this.props;
    return (
      <div>
        <HeaderContainer routeLocation={routeLocation} />
        {children}
      </div>
    );
  }
}

export default Root;

