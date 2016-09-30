import React, {Component, PropTypes} from 'react'

class PlaceholderRenderer extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  };

  render() {
    const {width, height, color} = this.props;
    const style = {
      width,
      height,
      background: color
    };
    return (
      <div style={style} />
    );
  }
}

export default PlaceholderRenderer;

