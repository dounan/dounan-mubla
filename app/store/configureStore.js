import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createApiMiddleware from "../api/middleware"

import rootReducer from '../reducers'

// NOTE: show DevTools in production so you can play with the data.
// Normally you want to omit this from production.
let DevTools = require('../components/DevTools').default;
// let DevTools = null;
// if (process.env.NODE_ENV !== 'production') {
//   DevTools = require('../components/DevTools').default;
// }

function getMiddlewares() {
  const apiMiddleware = createApiMiddleware();
  switch (process.env.NODE_ENV) {
    case 'production':
      return [
        apiMiddleware,
        thunk
      ];
    default:
      return [
        apiMiddleware,
        thunk
      ];
  }
}

function getStoreEnhancers() {
  var middlewareEnhancer = applyMiddleware(...getMiddlewares());
  const enhancers = [middlewareEnhancer];
  // DevTools must come after middleware
  if (window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  } else if (DevTools) {
    enhancers.push(DevTools.instrument());
  }
  return enhancers;
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(...getStoreEnhancers())
  );
}

