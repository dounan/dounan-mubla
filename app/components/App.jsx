import globalcss from './global.css'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import * as actions from '../actions'
import configureStore from '../store/configureStore'
import BrowseContainer from './BrowseContainer'
import TestComponent from './TestComponent'

let DevTools = null;
if (process.env.NODE_ENV !== 'production') {
  DevTools = require('./DevTools').default;
}

class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.checkInstaAccessToken());
  }

  render() {
    return (
      <div>
        {this.props.children}
        {!DevTools || window.devToolsExtension ? null : <DevTools />}
      </div>
    );
  }
}

const AppContainer = connect()(App);

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
 
ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Router history={history}>
        <Route path="/" component={BrowseContainer} />
        <Route path="/test" component={TestComponent} />
      </Router>
    </AppContainer>
  </Provider>,
  document.getElementById('app')
);

