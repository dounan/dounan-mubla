import React, {Component, PropTypes} from 'react'

const WRAPPER_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 200
};

class WindowOverlay extends Component {

  render() {
    const {style, ...other} = this.props;
    const wrapperStyle = Object.assign({}, WRAPPER_STYLE, style);
    return (
      <div {...other} style={wrapperStyle} />
    );
  };
}

export default WindowOverlay;

