import {Set} from 'immutable'
import React, {Component, PropTypes} from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import BlockLoader from './BlockLoader'
import Button from './Button'
import MediaGrid from './MediaGrid'
import * as pt from './propTypes'

const LOADING_STYLE = {
  marginLeft: 'auto',
  marginRight: 'auto'
};

const SMALL_LOADING_STYLE = {
  margin: '30px auto',
};

class Browse extends Component {

  static propTypes = {
    isLoadingPage: PropTypes.bool,
    mediaList: PropTypes.arrayOf(pt.MEDIA),
    hasMoreMedia: PropTypes.bool,
    onLoadMoreMedia: PropTypes.func,
    isLoadingMore: PropTypes.bool,

    canSelect: PropTypes.bool,
    selectedMediaIds: PropTypes.instanceOf(Set),
    // onItemCheckClick(mediaItem)
    onItemCheckClick: PropTypes.func,

    maxWidth: PropTypes.number.isRequired,
    maxRowHeight: PropTypes.number.isRequired,
    rowSpacing: PropTypes.number,
    colSpacing: PropTypes.number,

    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
    scrollX: PropTypes.number.isRequired,
    scrollY: PropTypes.number.isRequired,
    viewportBuffer: PropTypes.number.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {isLoadingPage} = this.props;
    if (isLoadingPage) {
      return (
        <BlockLoader width={150} style={LOADING_STYLE} />
      );
    }
    return (
      <div>
        {this.renderMediaList()}
        {this.renderLoadMore()}
      </div>
    );
  }

  renderMediaList = () => {
    const p = this.props;
    if (!p.mediaList) {
      return null;
    }
    return (
      <MediaGrid
          mediaList={p.mediaList}
          canSelect={p.canSelect}
          selectedMediaIds={p.selectedMediaIds}
          onItemCheckClick={p.onItemCheckClick}
          maxWidth={p.maxWidth}
          maxRowHeight={p.maxRowHeight}
          rowSpacing={p.rowSpacing}
          colSpacing={p.colSpacing}
          windowWidth={p.windowWidth}
          windowHeight={p.windowHeight}
          scrollX={p.scrollX}
          scrollY={p.scrollY}
          viewportBuffer={p.viewportBuffer} />
    );
  };

  renderLoadMore = () => {
    const {hasMoreMedia, isLoadingMore, onLoadMoreMedia} = this.props;
    if (!hasMoreMedia) {
      return null;
    }
    if (isLoadingMore) {
      return (
        <BlockLoader width={50} style={SMALL_LOADING_STYLE} />
      );
    }
    return (
      <Button onClick={onLoadMoreMedia}>
        Load More
      </Button>
    );
  };
}
 
export default Browse;

