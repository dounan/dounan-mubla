import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import nextLargerOrLargest from '../util/nextLargerOrLargest'
import {getIcon} from './icons'
import css from './MediaThumb.css'
import Thumb from './Thumb'
import * as pt from './propTypes'

class MediaThumb extends Component {

  static propTypes = {
    media: pt.MEDIA.isRequired,
    targetThumbHeight: PropTypes.number.isRequired
  };

  render() {
    return (
      <div className={css.wrapper}>
        {this.renderVideoIcon()}
        <Thumb url={this.bestUrl()} />
      </div>
    );
  };

  renderVideoIcon = () => {
    const {media} = this.props;
    if (media.type !== 'video') {
      return null;
    }
    const iconClass = classNames(css.icon, getIcon('video'));
    return (
      <span className={iconClass} />
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

