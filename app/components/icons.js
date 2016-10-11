import fa from '../assets/font-awesome/css/font-awesome.css'

const addFa = (className) => fa.fa + " " + className;

const iconMap = {
  add: addFa(fa['fa-plus']),
  album: addFa(fa['fa-book']),
  browse: addFa(fa['fa-th']),
  checkCircle: addFa(fa['fa-check-circle']),
  close: addFa(fa['fa-times'])
};

export const getIcon = (name) => {
  return iconMap[name];
};

