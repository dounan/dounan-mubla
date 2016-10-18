import React, {Component, PropTypes} from 'react'
import nextLargerOrLargest from '../util/nextLargerOrLargest'
import Thumb from './Thumb'
import * as pt from './propTypes'

class MediaThumb extends Component {

  static propTypes = {
    media: pt.MEDIA.isRequired,
    targetThumbHeight: PropTypes.number.isRequired
  };

  render() {
    // TODO: render video icon for video media
    return (
      <Thumb url={this.bestUrl()} />
    );
  };

  bestUrl = () => {
    const {media, targetThumbHeight} = this.props;
    const imgs = media.images;
    if (!imgs) return null;
    const img = nextLargerOrLargest(imgs, 'height', targetThumbHeight) || imgs[imgs.length - 1];
    return img.url;
  };
}

export default MediaThumb;

