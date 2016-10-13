import {Set} from 'immutable'
import React, {Component, PropTypes} from 'react'
import Browse from './Browse'
import InstagramAuthWallContainer from './InstagramAuthWallContainer'
import * as pt from './propTypes'
import ScrollView from './ScrollView'
import jsvars from './vars'

class MyMediaPage extends Component {

  static propTypes = {
    onInstagramToken: PropTypes.func,

    mediaList: PropTypes.arrayOf(pt.MEDIA),
    isLoadingPage: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    onLoadMoreMedia: PropTypes.func.isRequired,

    maxRowHeight: PropTypes.number.isRequired,
    rowSpacing: PropTypes.number,
    colSpacing: PropTypes.number,

    canSelect: PropTypes.bool,
    selectedMediaIds: PropTypes.instanceOf(Set),
    // onItemCheckClick(mediaItem)
    onItemCheckClick: PropTypes.func,

    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
    viewportBuffer: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollX: 0,
      scrollY: 0
    };
  };

  render() {
    const {onInstagramToken, onLoadMoreMedia, ...other} = this.props;
    const {scrollX, scrollY} = this.state;
    const maxWidth = other.windowWidth - 2 * jsvars.gutter;
    const scrollViewStyle = {
      position: 'relative',
      top: jsvars.headerHeight,
      width: other.windowWidth,
      height: other.windowHeight - jsvars.headerHeight,
      padding: jsvars.gutter,
      boxSizing: 'border-box'
    };
    return (
      <ScrollView
          style={scrollViewStyle}
          onBufferedScroll={this.handleScroll}
          onBottomEdge={onLoadMoreMedia}
          bottomBuffer={other.viewportBuffer}>
        <InstagramAuthWallContainer onInstagramToken={onInstagramToken}>
          <Browse
              {...other}
              maxWidth={maxWidth}
              scrollX={scrollX}
              scrollY={scrollY} />
        </InstagramAuthWallContainer>
      </ScrollView>
    );
  };

  handleScroll = ({scrollTop, scrollLeft}) => {
    this.setState({
      scrollX: scrollLeft,
      scrollY: scrollTop
    });
  };
}

export default MyMediaPage;

