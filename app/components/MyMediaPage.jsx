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

class MyMediaPage extends Component {

  static propTypes = {
    mediaStoreKey: PropTypes.string.isRequired,

    instaToken: PropTypes.string,
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
    const {instaToken, onInstagramToken, ...other} = this.props;
    const maxWidth = other.windowWidth - 2 * jsvars.gutter;
    return (
      <InstagramAuthWallContainer
          instaToken={instaToken}
          onInstagramToken={onInstagramToken}
          style={WRAPPER_STYLE}>
        <BrowseContainer {...other} maxWidth={maxWidth} />
      </InstagramAuthWallContainer>
    );
  };
}

export default MyMediaPage;

