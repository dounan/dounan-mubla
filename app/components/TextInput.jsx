import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import css from './TextInput.css'

class TextInput extends Component {

  static SUPPORTED_TYPES = ['email', 'number', 'password', 'text', 'url'];

  static propTypes = {
    styleType: PropTypes.oneOf(['empty', 'shaded']),
    type: PropTypes.oneOf(TextInput.SUPPORTED_TYPES)
  };

  static defaultProps = {
    styleType: 'empty',
    type: 'text'
  };

  render() {
    const {styleType, className, ...other} = this.props;
    return (
      <input
          {...other}
          className={classNames(className, css[styleType])} />
    );
  }
}

export default TextInput;

