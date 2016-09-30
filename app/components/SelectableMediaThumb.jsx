import React, {Component, PropTypes} from 'react'
import CheckSelect from './CheckSelect'
import MediaThumb from './MediaThumb'
import * as pt from './propTypes'

const WRAPPER_STYLE = {
  width: '100%',
  height: '100%'
};

class SelectableMediaThumb extends Component {

  static propTypes = {
    media: pt.MEDIA.isRequired,
    isSelected: PropTypes.bool,
    canSelect: PropTypes.bool,
    onCheckClick: PropTypes.func
  };

  render() {
    const {
      media,
      isSelected,
      canSelect,
      onCheckClick,
      ...other
    } = this.props;

    return (
      <CheckSelect
          {...other}
          isSelected={isSelected}
          canSelect={canSelect}
          onCheckClick={onCheckClick}
          style={WRAPPER_STYLE}>
        <MediaThumb media={media} />
      </CheckSelect>
    );
  }
}

export default SelectableMediaThumb;

