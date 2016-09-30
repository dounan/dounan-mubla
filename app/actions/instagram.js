import get from 'lodash/get'
import uuid from 'node-uuid'

export const OAUTH_URL = 'https://api.instagram.com/oauth/authorize/';
export const CLIENT_ID = '0f49a3fcf52947538a5649112bb5bf57';
export const ACCESS_TOKEN_REGEX = /(access_token=([a-f0-9\.]+))/;

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
}

export function extractMediaList(body) {
  return get(body, 'data', []).map(toMedia);
}

export function extractPagination(body) {
  return {
    maxId: get(body, 'pagination.next_max_id')
  };
}

export function isSuccess(body) {
  return body.meta.code === 200;
}

