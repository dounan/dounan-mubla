import {PropTypes} from 'react'

// TODO: use PropTypes.shape
export const MEDIA = PropTypes.object;

export const VIEWPORT = PropTypes.shape({
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
});

// TODO: use PropTypes.shape
export const ROUTE_LOCATION = PropTypes.object;

