import {endpoint, apiAction} from './middleware'

const INSTA_URL = 'https://api.instagram.com/v1';

const INSTA_RECENT_MEDIA = endpoint('GET', `${INSTA_URL}/users/self/media/recent{?q*}`, {
  jsonp: true
});
export const instaRecentMedia = apiAction.bind(null, INSTA_RECENT_MEDIA);

const INSTA_SEARCH_TAGS = endpoint('GET', `${INSTA_URL}/tags/search{?q*}`, {
  jsonp: true
});
export const instaSearchTags = apiAction.bind(null, INSTA_SEARCH_TAGS);

const INSTA_RECENT_TAG_MEDIA = endpoint('GET', `${INSTA_URL}/tags/{tagName}/media/recent{?q*}`, {
  jsonp: true
});
export const instaRecentTagMedia = apiAction.bind(null, INSTA_RECENT_TAG_MEDIA);

