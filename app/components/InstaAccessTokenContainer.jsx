import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

class Container extends Component {

  componentWillMount() {
    const {dispatch, params} = this.props;
    dispatch(actions.setInstaAccessToken(params.token));
    dispatch(actions.gotoMyMedia());
  };

  render() {
    return (<div />);
  };
}

export default connect()(Container);

