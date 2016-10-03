import React, {Component, PropTypes} from 'react'

const STYLES = {
  "empty": {
    background: "none",
    border: "none",
    outline: "none",
    padding: 0
  }
};

class Button extends Component {

  static propTypes = {
    styleType: PropTypes.oneOf(Object.keys(STYLES))
  };

  static defaultProps = {
    type: 'button'
  };

  render() {
    const {styleType, style, ...other} = this.props;
    const btnStyle = Object.assign({}, STYLES[styleType], style);
    return (
      <button {...other} style={btnStyle} />
    );
  }
}

export default Button;

