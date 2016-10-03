import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import * as api from '../api'
import Browse from './Browse'

function mapStateToProps(state, ownProps) {
  const {instagram, media} = state;
  const instaMaxId = get(media, 'instaPagination.maxId');
  return {
    instaToken: instagram.token,
    isLoadingPage: media.isFetching,
    isLoadingMore: media.isFetchingMore,
    mediaList: media.mediaList,
    hasMoreMedia: !!instaMaxId,
    instaMaxId: instaMaxId
  };
}

class Container extends Component {

  componentWillMount() {
    const {dispatch, instaToken} = this.props;
    if (instaToken) {
      dispatch(actions.loadMedia(instaToken));
    }
  }

  render() {
    return (
      <Browse {...this.props}
          onInstaAuthClick={this.instaAuth}
          onLoadMoreMedia={this.loadMoreMedia} />
    );
  }

  instaAuth = () => {
    this.props.dispatch(actions.instaAuth());
  };

  loadMoreMedia = () => {
    const {dispatch, instaToken, instaMaxId} = this.props;
    dispatch(actions.moreMedia(instaToken, instaMaxId));
  }
}

export default connect(mapStateToProps)(Container);

