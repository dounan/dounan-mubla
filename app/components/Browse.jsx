import React, {Component, PropTypes} from 'react'
import Button from './Button'
import TestComponent from './TestComponent'

// TODO: use PropTypes.shape
const PT_MEDIA = PropTypes.object;

class Browse extends Component {

  static propTypes = {
    instaToken: PropTypes.string,
    onInstaAuthClick: PropTypes.func.isRequired,

    isLoadingPage: PropTypes.bool,
    mediaList: PropTypes.arrayOf(PT_MEDIA),
    hasMoreMedia: PropTypes.bool,
    onLoadMoreMedia: PropTypes.func,
    isLoadingMore: PropTypes.bool
  };

  render() {
    return (
      <div>
        {this.renderInstaAuth()}
        {this.renderMediaList()}
        {this.renderLoadMore()}
      </div>
    );
  }

  renderInstaAuth = () => {
    const {instaToken, onInstaAuthClick} = this.props;
    if (instaToken) {
      return null;
    }
    return (
      <Button onClick={onInstaAuthClick}>
        Authorize Instagram
      </Button>
    );
  };

  renderMediaList = () => {
    const {mediaList} = this.props;
    if (!mediaList) {
      return null;
    }
    return mediaList.map(this.renderMedia);
  };

  renderMedia = (media, i) => {
    // TODO
    return (
      <div key={i}>
        <img src={media.images[0].url} />
      </div>
    );
  };

  renderLoadMore = () => {
    const {hasMoreMedia, isLoadingMore, onLoadMoreMedia} = this.props;
    if (!hasMoreMedia || isLoadingMore) {
      return null;
    }
    return (
      <Button onClick={onLoadMoreMedia}>
        Load More
      </Button>
    );
  };
}
 
export default Browse;

