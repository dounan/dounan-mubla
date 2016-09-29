import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import jsvars from './vars'
import css from './TestComponent.css'

class TestComponent extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className={css.wrapper}>
        Hello world
        <input ref="input" type="text" />
      </div>
    );
  }
}

export default TestComponent;

