import fa from '../assets/font-awesome/css/font-awesome.css'

const addFa = (className) => fa.fa + " " + className;

const iconMap = {
  checkCircle: addFa(fa['fa-check-circle']),
  browse: addFa(fa['fa-th']),
  album: addFa(fa['fa-book'])
};

export const getIcon = (name) => {
  return iconMap[name];
};

