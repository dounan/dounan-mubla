import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Template from './Template'

// Use this Container component if you need to do things on component lifecycle
// events such as componentWillMount. Otherwise just connect the Template
// component directly.
class Container extends Component {

  componentWillMount() {
  };

  render() {
    return (
      <Template {...this.props} />
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  };
};

const TemplateContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);

TemplateContainer.propTypes = {
};

export default TemplateContainer;

