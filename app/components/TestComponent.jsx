import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import jsvars from './vars'
import css from './TestComponent.css'

class TestComponent extends Component {
  render() {
    return (
      <div className={css.wrapper}>
      </div>
    );
  }
}

export default TestComponent;

