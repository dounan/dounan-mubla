import fa from '../assets/font-awesome/css/font-awesome.css'

const addFa = (className) => fa.fa + " " + className;

const iconMap = {
  add: addFa(fa['fa-plus']),
  album: addFa(fa['fa-book']),
  checkCircle: addFa(fa['fa-check-circle']),
  close: addFa(fa['fa-times']),
  myMedia: addFa(fa['fa-th']),
  search: addFa(fa['fa-search']),
  video: addFa(fa['fa-video-camera'])
};

export const getIcon = (name) => {
  return iconMap[name];
};

