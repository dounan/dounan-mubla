import {endpoint, apiAction} from './middleware'

const INSTA_URL = 'https://api.instagram.com/v1';

const INSTA_RECENT_MEDIA = endpoint('GET', `${INSTA_URL}/users/self/media/recent{?q*}`, {
  jsonp: true
});
export const instaRecentMedia = apiAction.bind(null, INSTA_RECENT_MEDIA);

