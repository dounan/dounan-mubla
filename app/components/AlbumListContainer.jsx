import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import AlbumList from './AlbumList'

function mapStateToProps(state, ownProps) {
  return {
  };
};

class Container extends Component {

  componentWillMount() {
  };

  render() {
    return (
      <AlbumList />
    );
  };
}

export default connect(mapStateToProps)(Container);

