import React, {Component, PropTypes} from 'react'

class Thumb extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    const {url, style, ...other} = this.props;
    const divStyle = Object.assign({
      width: '100%',
      height: '100%',
      backgroundImage: `url('${url}')`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }, style);
    return (
      <div {...other} style={divStyle} />
    );
  }
}

export default Thumb;

