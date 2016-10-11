import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import Button from './Button'
import {getIcon} from './icons'
import css from './SelectedBar.css'

class SelectedBar extends Component {

  static propTypes = {
    numSelected: PropTypes.number,
    onCloseClick: PropTypes.func.isRequired,
    rightItems: PropTypes.arrayOf(PropTypes.node)
  };

  static defaultProps = {
    numSelected: 0
  };

  render() {
    const p = this.props;
    return (
      <div className={css.bar}>
        <div>
          <Button
              className={css.close}
              styleType='text'
              onClick={p.onCloseClick}>
            <span className={getIcon('close')} />
          </Button>
          <span>{p.numSelected} selected</span>
        </div>
        <div>{p.rightItems}</div>
      </div>
    );
  };
}

export default SelectedBar;

