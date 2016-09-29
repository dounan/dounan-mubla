import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

let DevTools = null;
if (process.env.NODE_ENV !== 'production') {
  DevTools = require('../components/DevTools').default;
}

function getMiddlewares() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return [
        thunk
      ];
    default:
      return [
        thunk
      ];
  }
}

function getStoreEnhancers() {
  var middlewareEnhancer = applyMiddleware(...getMiddlewares());
  switch (process.env.NODE_ENV) {
    case 'production':
      const enhancers = [middlewareEnhancer];
      // DevTools must come after middleware
      if (window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
      }
      return enhancers;
    default:
      return [
        middlewareEnhancer,
        // DevTools must come after middleware
        !DevTools || window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
      ];
  }
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(...getStoreEnhancers())
  );
}

