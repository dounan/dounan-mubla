import React, {Component, PropTypes} from 'react'
import css from './MediaSlider.css'
import MediaViewer from './MediaViewer'
import * as pt from './propTypes'

class MediaSlider extends Component {

  static propTypes = {
    mediaList: PropTypes.arrayOf(pt.MEDIA).isRequired,
    activeIdx: PropTypes.number.isRequired,
    targetThumbHeight: PropTypes.number.isRequired
  };

  render() {
    const p = this.props;
    const media = p.mediaList[p.activeIdx];
    return (
      <div className={css.wrapper}>
        <MediaViewer 
            media={media}
            targetThumbHeight={p.targetThumbHeight} />
      </div>
    );
  };
}

export default MediaSlider;

