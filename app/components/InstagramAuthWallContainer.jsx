import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import InstagramAuthWall from './InstagramAuthWall'

class Container extends Component {

  componentWillMount() {
    this.handleTokenChange(this.props);
  };

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    if (nextProps.instaToken !== p.instaToken) {
      this.handleTokenChange(nextProps);
    }
  };

  render() {
    const {instaToken, onInstagramToken, ...other} = this.props;
    return (
      <InstagramAuthWall {...other} hasToken={!!instaToken} />
    );
  };

  handleTokenChange = (props) => {
    const {onInstagramToken} = props;
    if (onInstagramToken) {
      onInstagramToken();
    }
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onAuthClick: () => dispatch(actions.instaAuth())
  };
};

const InstagramAuthWallContainer = connect(null, mapDispatchToProps)(Container);

InstagramAuthWallContainer.propTypes = {
  instaToken: PropTypes.string,
  // Called on mount and when the token changes.
  // onInstagramToken()
  onInstagramToken: PropTypes.func
};

export default InstagramAuthWallContainer;

