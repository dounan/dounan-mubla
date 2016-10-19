import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import css from './Button.css'
import jsvars from './vars'

class Button extends Component {

  static propTypes = {
    styleType: PropTypes.oneOf(['empty', 'text', 'primary'])
  };

  static defaultProps = {
    type: 'button'
  };

  render() {
    const {styleType, className, ...other} = this.props;
    const btnClass = classNames(className, css[styleType]);
    return (
      <button {...other} className={btnClass} />
    );
  }
}

export default Button;

