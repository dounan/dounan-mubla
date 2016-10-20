import React, {Component, PropTypes} from 'react'
import nextLargerOrLargest from '../util/nextLargerOrLargest'
import Image from './Image'
import * as pt from './propTypes'

const WRAPPER_STYLE = {
  height: '100%',
  textAlign: 'center'
};

const CONTENT_STYLE = {
  height: '100%'
};

class MediaViewer extends Component {

  static propTypes = {
    media: pt.MEDIA.isRequired,
    targetThumbHeight: PropTypes.number.isRequired
  };

  render() {
    return (
      <div style={WRAPPER_STYLE}>
        {this.renderMedia()}
      </div>
    );
  };

  renderMedia = () => {
    const {media} = this.props;
    switch (media.type) {
      case 'image':
        return this.renderImage();
      case 'video':
        return this.renderVideo();
    }
    throw new Error(`Unrecognized media type ${media.type}`);
  };

  renderImage = () => {
    const p = this.props;
    const src = this.bestUrl(p.media.images);
    return (
      <Image
          src={src}
          style={CONTENT_STYLE} />
    );
  };

  renderVideo = () => {
    // TODO
  };

  bestUrl = (objs) => {
    const {targetThumbHeight} = this.props;
    if (!objs) return null;
    const obj = nextLargerOrLargest(objs, 'height', targetThumbHeight) || objs[objs.length - 1];
    return obj.url;
  };
}

export default MediaViewer;

