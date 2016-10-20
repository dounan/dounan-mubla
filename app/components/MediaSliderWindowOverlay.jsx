import React, {Component, PropTypes} from 'react'
import Button from './Button'
import {getIcon} from './icons'
import MediaSlider from './MediaSlider'
import * as pt from './propTypes'
import WindowOverlay from  './WindowOverlay'

const CLOSE_STYLE = {
  position: 'absolute',
  top: 20,
  left: 20,
  color: 'white',
  fontSize: '26px',
  zIndex: 1
};

class MediaSliderWindowOverlay extends Component {

  static propTypes = {
    mediaList: PropTypes.arrayOf(pt.MEDIA).isRequired,
    activeIdx: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    windowHeight: PropTypes.number.isRequired
  };

  render() {
    const p = this.props;
    return (
      <WindowOverlay>
        <Button
            style={CLOSE_STYLE}
            styleType='text'
            onClick={p.onClose}>
          <span className={getIcon('back')} />
        </Button>
        <MediaSlider
            mediaList={p.mediaList}
            activeIdx={p.activeIdx}
            targetThumbHeight={p.windowHeight} />
      </WindowOverlay>
    );
  };
}

export default MediaSliderWindowOverlay;

