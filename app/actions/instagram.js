import get from 'lodash/get'
import uuid from 'node-uuid'
import URI from 'urijs'

const OAUTH_URL = 'https://api.instagram.com/oauth/authorize/';
const CLIENT_ID = '0f49a3fcf52947538a5649112bb5bf57';

export function authUrl() {
  const u = new URI(window.location);
  u.hash("");
  const redirect = encodeURIComponent(u.toString());
  return `${OAUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=token&scope=public_content`;
};

// Converts an instagram media object to mubla media object.
export function toMedia(o) {
  const media = {
    id: uuid.v4(),
    type: o.type
  };
  if (o.images) {
    media.images = [o.images.low_resolution, o.images.standard_resolution, o.images.thumbnail];
  }
  if (o.videos) {
    media.videos = [o.videos.low_resolution, o.videos.standard_resolution];
  }
  return media;
};

export function emptyBody() {
  return {
    data: [],
    meta: {code: 200}
  };
};

export function extractMediaList(body) {
  return get(body, 'data', []).map(toMedia);
};

export function extractPagination(body) {
  return get(body, 'pagination');
};

export function addPaginationData(body, data) {
  return {
    ...body,
    pagination: Object.assign({}, extractPagination(body), data)
  };
};

export function hasMore(body) {
  const p = get(body, 'pagination', {});
  return !!p['next_max_id'] || !!p['next_max_tag_id'];
};

export function extractTopTagName(body) {
  return get(body, 'data.0.name');
};

export function isSuccess(body) {
  return body.meta.code === 200;
};

