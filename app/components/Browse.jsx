import {Set} from 'immutable'
import isEmpty from 'lodash/isEmpty'
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
    mediaList: PropTypes.arrayOf(pt.MEDIA),
    isLoadingPage: PropTypes.bool,
    isLoadingMore: PropTypes.bool,

    emptyView: PropTypes.node,

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
    if (isEmpty(p.mediaList)) {
      return p.emptyView;
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
    const {isLoadingMore} = this.props;
    if (!isLoadingMore) {
      return null;
    }
    return (
      <BlockLoader width={50} style={SMALL_LOADING_STYLE} />
    );
  };
}
 
export default Browse;

