import fa from '../assets/font-awesome/css/font-awesome.css'

const addFa = (className) => fa.fa + " " + className;

export default {
  checkCircleO: addFa(fa['fa-check-circle-o'])
};

