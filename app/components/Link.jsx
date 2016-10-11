import React, {Component, PropTypes} from 'react'

class Link extends Component {

  static propTypes = {
  };

  static defaultProps = {
    href: 'javascript:void(0)'
  };

  render() {
    return (
      <a {...this.props} />
    );
  }
}

export default Link;

