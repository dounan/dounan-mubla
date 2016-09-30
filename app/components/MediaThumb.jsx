import React, {Component, PropTypes} from 'react'
import Thumb from './Thumb'
import * as pt from './propTypes'

class MediaThumb extends Component {

  static propTypes = {
    media: pt.MEDIA.isRequired
  };

  render() {
    const {media} = this.props;
    // TODO: pick closest image based on height
    const url = media.images[0].url;
    // TODO: render video icon for video media
    return (
      <Thumb url={url} />
    );
  }
}

export default MediaThumb;

