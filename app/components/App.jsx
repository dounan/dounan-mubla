// Not used. Import to load the file, which applies the global styles.
import globalcss from './global.css'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {Router, Route, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import * as actions from '../actions'
import configureStore, {ROUTER_HISTORY} from '../store/configureStore'
import AlbumListContainer from './AlbumListContainer'
import InstaAccessTokenContainer from './InstaAccessTokenContainer'
import MyMediaPageContainer from './MyMediaPageContainer'
import Root from './Root'
import SearchPageContainer from './SearchPageContainer'
import TestComponent from './TestComponent'

// NOTE: show DevTools in production so you can play with the data.
// Normally you want to omit this from production.
let DevTools = require('./DevTools').default;
// let DevTools = null;
// if (process.env.NODE_ENV !== 'production') {
//   DevTools = require('./DevTools').default;
// }

class App extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.restoreInstaAccessToken());
  };

  render() {
    const {location, children} = this.props;
    return (
      <Root routeLocation={location}>
        {children}
        {!DevTools || window.devToolsExtension ? null : <DevTools />}
      </Root>
    );
  }
}

const AppContainer = connect()(App);
const store = configureStore();
const history = syncHistoryWithStore(ROUTER_HISTORY, store);
 
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={AppContainer}>
        <IndexRoute component={MyMediaPageContainer} />
        <Route path='/search' component={SearchPageContainer} />
        <Route path='/albums' component={AlbumListContainer} />
      </Route>
      <Route path='access_token=:token' component={InstaAccessTokenContainer} />
      <Route path='/test' component={TestComponent} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

