import fa from '../assets/font-awesome/css/font-awesome.css'

const addFa = (className) => fa.fa + " " + className;

export default {
  checkCircle: addFa(fa['fa-check-circle'])
};

