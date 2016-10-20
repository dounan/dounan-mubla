import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import Button from './Button'
import CheckSelect from './CheckSelect'
import MediaThumb from './MediaThumb'
import * as pt from './propTypes'
import css from './SelectableMediaThumb.css'

const WRAPPER_STYLE = {
  width: '100%',
  height: '100%'
};

class SelectableMediaThumb extends Component {

  static propTypes = {
    media: pt.MEDIA.isRequired,
    targetThumbHeight: PropTypes.number.isRequired,
    isSelected: PropTypes.bool,
    canSelect: PropTypes.bool,
    onCheckClick: PropTypes.func,
    onClick: PropTypes.func
  };

  render() {
    const {
      media,
      targetThumbHeight,
      isSelected,
      canSelect,
      onCheckClick,
      onClick,
      ...other
    } = this.props;

    const wrapperClass = classNames(css.wrapper, {
      [css.selected]: isSelected
    });

    return (
      <div className={wrapperClass}>
        <CheckSelect
            {...other}
            isSelected={isSelected}
            canSelect={canSelect}
            onCheckClick={onCheckClick}
            hideUntilHover={true}
            checkZIndex={2}
            style={WRAPPER_STYLE}>
          <div className={css.hoverFade} />
          <div className={css.selectedFade} />
          <Button
              className={css.thumbBtn}
              styleType='empty'
              onClick={onClick}>
            <MediaThumb
                media={media}
                targetThumbHeight={targetThumbHeight}/>
          </Button>
        </CheckSelect>
      </div>
    );
  }
}

export default SelectableMediaThumb;

