
const imageMap = {
  logo: require('../assets/logo.png')
};

export const getImage = (name) => {
  return imageMap[name];
};

