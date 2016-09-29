import globalcss from './global.css'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from '../store/configureStore'
import Browse from './Browse'

let DevTools = null;
if (process.env.NODE_ENV !== 'production') {
  DevTools = require('./DevTools').default;
}

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        {!DevTools || window.devToolsExtension ? null : <DevTools />}
      </div>
    );
  }
}
 
const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Browse} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

