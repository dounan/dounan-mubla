import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import {getIcon} from './icons'
import css from './CheckSelect.css'
import Button from './Button'

class CheckSelect extends Component {

  static propTypes = {
    isSelected: PropTypes.bool,
    canSelect: PropTypes.bool,
    onCheckClick: PropTypes.func,
    hideUntilHover: PropTypes.bool,
    checkZIndex: PropTypes.number
  };

  render() {
    const {
      isSelected,
      canSelect,
      onCheckClick,
      hideUntilHover,
      checkZIndex,
      children,
      className,
      ...other
    } = this.props;

    const wrapperClass = classNames(className, css.wrapper, {
      [css.hideUntilHover]: hideUntilHover
    });

    return (
      <div
          {...other}
          className={wrapperClass}>
        {this.renderCheck()}
        {children}
      </div>
    );
  }

  renderCheck = () => {
    const {isSelected, canSelect, onCheckClick, checkZIndex} = this.props;
    if (!canSelect) {
      return null;
    }
    const className = classNames(css.check, {
      [css.selected]: isSelected
    });
    const style = {
      zIndex: checkZIndex
    };
    return (
      <Button
          styleType='empty'
          className={className}
          style={style}
          onClick={onCheckClick}>
        <span className={getIcon('checkCircle')} />
      </Button>
    );
  };
}

export default CheckSelect;

