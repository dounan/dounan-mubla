import React, {Component, PropTypes} from 'react'

const STYLE = {
  padding: 0,
  border: 0,
  outline: 0
}

class TextInput extends Component {

  static SUPPORTED_TYPES = ['email', 'number', 'password', 'text', 'url'];

  static propTypes = {
    type: PropTypes.oneOf(TextInput.SUPPORTED_TYPES)
  };

  static defaultProps = {
    type: 'text'
  };

  render() {
    const {style, ...other} = this.props;
    const inputStyle = Object.assign(STYLE, style);
    return (<input style={inputStyle} {...other} />);
  }
}

export default TextInput;

