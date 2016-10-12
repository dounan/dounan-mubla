import get from 'lodash/get'
import uuid from 'node-uuid'
import URI from 'urijs'

const OAUTH_URL = 'https://api.instagram.com/oauth/authorize/';
const CLIENT_ID = '0f49a3fcf52947538a5649112bb5bf57';

export function authUrl() {
  const u = new URI(window.location);
  u.hash("");
  const redirect = encodeURIComponent(u.toString());
  return `${OAUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=token`;
}

// Converts an instagram media object to mubla media object.
export function toMedia(o) {
  const media = {
    id: uuid.v4()
  };
  if (o.images) {
    media.images = [o.images.low_resolution, o.images.standard_resolution, o.images.thumbnail];
  }
  if (o.videos) {
    media.videos = [o.videos.low_resolution, o.videos.standard_resolution];
  }
  return media;
};

export function extractMediaList(body) {
  return get(body, 'data', []).map(toMedia);
};

export function extractPagination(body) {
  return get(body, 'pagination');
};

export function hasMore(body) {
  return !!get(body, 'pagination.next_max_id');
};

export function isSuccess(body) {
  return body.meta.code === 200;
};

