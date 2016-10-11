import {Set} from 'immutable'
import React, {Component, PropTypes} from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import BlockLoader from './BlockLoader'
import Button from './Button'
import MediaGrid from './MediaGrid'
import * as pt from './propTypes'
import jsvars from './vars'

const WRAPPER_STYLE = {
  marginTop: jsvars.headerHeight, 
  paddingTop: jsvars.gutter,
  paddingLeft: jsvars.gutter,
  paddingRight: jsvars.gutter
};

const LOADING_STYLE = {
  marginTop: jsvars.headerHeight + 100,
  marginLeft: 'auto',
  marginRight: 'auto'
};

const SMALL_LOADING_STYLE = {
  margin: '30px auto',
};

class Browse extends Component {

  static propTypes = {
    instaToken: PropTypes.string,
    onInstaAuthClick: PropTypes.func.isRequired,

    isLoadingPage: PropTypes.bool,
    mediaList: PropTypes.arrayOf(pt.MEDIA),
    hasMoreMedia: PropTypes.bool,
    onLoadMoreMedia: PropTypes.func,
    isLoadingMore: PropTypes.bool,

    canSelect: PropTypes.bool,
    selectedMediaIds: PropTypes.instanceOf(Set),
    // onItemCheckClick(mediaItem)
    onItemCheckClick: PropTypes.func,

    maxRowHeight: PropTypes.number.isRequired,
    rowSpacing: PropTypes.number,
    colSpacing: PropTypes.number,

    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
    windowScrollX: PropTypes.number.isRequired,
    windowScrollY: PropTypes.number.isRequired,
    viewportBuffer: PropTypes.number.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    if (this.props.isLoadingPage) {
      return (
        <BlockLoader width={150} style={LOADING_STYLE} />
      );
    }
    return (
      <div style={WRAPPER_STYLE}>
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
    const p = this.props;
    if (!p.mediaList) {
      return null;
    }
    const maxWidth = p.windowWidth - 2 * jsvars.gutter;
    return (
      <MediaGrid
          mediaList={p.mediaList}
          canSelect={p.canSelect}
          selectedMediaIds={p.selectedMediaIds}
          onItemCheckClick={p.onItemCheckClick}
          maxWidth={maxWidth}
          maxRowHeight={p.maxRowHeight}
          rowSpacing={p.rowSpacing}
          colSpacing={p.colSpacing}
          windowWidth={p.windowWidth}
          windowHeight={p.windowHeight}
          scrollX={p.windowScrollX}
          scrollY={p.windowScrollY}
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

