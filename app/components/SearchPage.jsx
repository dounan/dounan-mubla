import React, {Component, PropTypes} from 'react'
import BrowseContainer from './BrowseContainer'
import InstagramAuthWallContainer from './InstagramAuthWallContainer'
import jsvars from './vars'

const WRAPPER_STYLE = {
  marginTop: jsvars.headerHeight, 
  paddingTop: jsvars.gutter,
  paddingLeft: jsvars.gutter,
  paddingRight: jsvars.gutter
};

const SEARCH_INSTR_STYLE = {
  fontSize: 24,
  color: jsvars.gray,
  textAlign: 'center'
};

class SearchPage extends Component {

  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    mediaStoreKey: PropTypes.string.isRequired,

    onInstagramToken: PropTypes.func,

    // onLoadMoreMedia(pagination)
    onLoadMoreMedia: PropTypes.func.isRequired,

    maxRowHeight: PropTypes.number.isRequired,
    rowSpacing: PropTypes.number,
    colSpacing: PropTypes.number,

    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
    scrollX: PropTypes.number.isRequired,
    scrollY: PropTypes.number.isRequired,
    viewportBuffer: PropTypes.number.isRequired
  };

  render() {
    const {onInstagramToken, searchQuery} = this.props;
    return (
      <InstagramAuthWallContainer
          onInstagramToken={onInstagramToken}
          style={WRAPPER_STYLE}>
        {searchQuery ? this.renderBrowse() : this.renderInstr()}
      </InstagramAuthWallContainer>
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
    const {onInstagramToken, searchQuery, ...other} = this.props;
    const maxWidth = other.windowWidth - 2 * jsvars.gutter;
    return (
      <BrowseContainer
          {...other}
          emptyView={this.renderNoResults()}
          maxWidth={maxWidth} />
    );
  };

  renderNoResults = () => {
    return (
      <div style={SEARCH_INSTR_STYLE}>
        No results found
      </div>
    );
  };
}

export default SearchPage;

