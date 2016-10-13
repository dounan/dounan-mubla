import {Set} from 'immutable'
import React, {Component, PropTypes} from 'react'
import Browse from './Browse'
import InstagramAuthWallContainer from './InstagramAuthWallContainer'
import * as pt from './propTypes'
import ScrollView from './ScrollView'
import jsvars from './vars'

const SEARCH_INSTR_STYLE = {
  fontSize: 24,
  color: jsvars.gray,
  textAlign: 'center'
};

class SearchPage extends Component {

  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
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
    const p = this.props;
    const scrollViewStyle = {
      position: 'relative',
      top: jsvars.headerHeight,
      width: p.windowWidth,
      height: p.windowHeight - jsvars.headerHeight,
      padding: jsvars.gutter,
      boxSizing: 'border-box'
    };

    return (
      <ScrollView
          style={scrollViewStyle}
          onBufferedScroll={this.handleScroll}
          onBottomEdge={p.onLoadMoreMedia}
          bottomBuffer={p.viewportBuffer}>
        <InstagramAuthWallContainer onInstagramToken={p.onInstagramToken}>
          {p.searchQuery ? this.renderBrowse() : this.renderInstr()}
        </InstagramAuthWallContainer>
      </ScrollView>
    );
  };

  renderInstr = () => {
    return (
      <div style={SEARCH_INSTR_STYLE}>
        Search by typing in the search box above
      </div>
    );
  };

  renderBrowse = () => {
    const {onInstagramToken, onLoadMoreMedia, searchQuery, ...other} = this.props;
    const {scrollX, scrollY} = this.state;
    const maxWidth = other.windowWidth - 2 * jsvars.gutter;
    return (
      <Browse
          {...other}
          emptyView={this.renderNoResults()}
          maxWidth={maxWidth}
          scrollX={scrollX}
          scrollY={scrollY} />
    );
  };

  renderNoResults = () => {
    return (
      <div style={SEARCH_INSTR_STYLE}>
        No results found
      </div>
    );
  };

  handleScroll = ({scrollTop, scrollLeft}) => {
    this.setState({
      scrollX: scrollLeft,
      scrollY: scrollTop
    });
  };
}

export default SearchPage;

