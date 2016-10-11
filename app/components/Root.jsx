import React, {Component, PropTypes} from 'react'
import Header from './Header'
import * as pt from './propTypes'

class Root extends Component {

  static propTypes = {
    routeLocation: pt.ROUTE_LOCATION
  };

  render() {
    const {routeLocation, children} = this.props;
    return (
      <div>
        <Header routeLocation={routeLocation} />
        {children}
      </div>
    );
  }
}

export default Root;

