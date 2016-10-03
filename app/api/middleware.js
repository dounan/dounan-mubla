import URITemplate from 'urijs/src/URITemplate'
import fetchJsonp from 'fetch-jsonp'

const API = Symbol('API');

function fetchEndpoint(endpoint, params) {
  let {url, ajaxOptions} = endpoint;
  url = new URITemplate(url).expand(params);
  if (ajaxOptions.jsonp) {
    return fetchJsonp(url);
  } else {
    return fetch(url, ajaxOptions);
  }
}

function parseResponse(endpoint, response) {
  if (endpoint.ajaxOptions.jsonp) {
    return response.json();
  }
  const contentType = response.headers.get('content-type');
  if (/^application\/json(;.*)?$/.test(contentType)) {
    return response.json();
  } else {
    throw new Error('Unsupported response content-type: ' + contentType);
  }
}

function addBody(endpoint, result) {
  return parseResponse(endpoint, result.response)
      .then(body => ({response: result.response, body}));
}

function defaultHandler(action) {
  const {endpoint, params} = action;
  return fetchEndpoint(endpoint, params)
      .then(response => ({response}))
      .then(addBody.bind(null, endpoint));
}

/**
 * Helper function for creating an api endpoint object.
 */
export const endpoint = (method, url, ajaxOptions=null) => {
  ajaxOptions = Object.assign({}, ajaxOptions, {method});
  return {url, ajaxOptions};
}

/**
 * API action creator.
 */
export const apiAction = (endpoint, params) => ({
  type: API,
  endpoint,
  params: Object.assign({callback: '?'}, params)
});

/**
 * This middleware handles dispatched API actions and returns an promise that
 * resolves to {response, body}, where response is the original api response
 * and body is the parsed response content.
 */
export default function createApiMiddleware() {
  return function apiMiddleware(store) {
    return next => action => {
      if (action.type !== API) {
        return next(action);
      }
      return defaultHandler(action);
    };
  };
}

