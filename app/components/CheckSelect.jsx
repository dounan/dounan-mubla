import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import {getIcon} from './icons'
import css from './CheckSelect.css'
import Button from './Button'

class CheckSelect extends Component {

  static propTypes = {
    isSelected: PropTypes.bool,
    canSelect: PropTypes.bool,
    onCheckClick: PropTypes.func
  };

  render() {
    const {
      isSelected,
      canSelect,
      onCheckClick,
      children,
      style,
      ...other
    } = this.props;

    const wrapperStyle = Object.assign({
      position: 'relative'
    }, style);

    return (
      <div {...other} style={wrapperStyle}>
        {this.renderCheck()}
        {children}
      </div>
    );
  }

  renderCheck = () => {
    const {isSelected, canSelect, onCheckClick} = this.props;
    if (!canSelect) {
      return null;
    }
    const className = classNames(css.check, {
      [css.selected]: isSelected
    });
    return (
      <Button
          styleType='empty'
          className={className}
          onClick={onCheckClick}>
        <span className={getIcon('checkCircle')} />
      </Button>
    );
  };
}

export default CheckSelect;

