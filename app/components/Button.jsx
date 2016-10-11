import React, {Component, PropTypes} from 'react'

const EMPTY_STYLE = {
  background: 'none',
  border: 'none',
  outline: 'none',
  padding: 0,
  cursor: 'pointer'
};

const STYLES = {
  empty: EMPTY_STYLE,
  text: Object.assign({}, EMPTY_STYLE, {
    color: 'inherit',
    fontSize: 'inherit'
  })
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

