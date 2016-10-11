import React, {Component, PropTypes} from 'react'

class Visible extends Component {

  static propTypes = {
    visible: PropTypes.bool,
    animDuration: PropTypes.number
  };

  static defaultProps = {
    animDuration: 0.2
  };

  render() {
    const {visible, animDuration, ...other} = this.props;
    const style = Object.assign(this.getStyle(), other.style);
    return (
      <div {...other} style={style} />
    );
  };

  getStyle = () => this.props.visible ? this.visibleStyle() : this.hiddenStyle();

  visibleStyle = () => {
    const dur = this.props.animDuration;
    return {
      visibility: 'visible',
      opacity: 1,
      transition: `opacity ${dur}s`
    };
  };

  hiddenStyle = () => {
    const dur = this.props.animDuration;
    return {
      visibility: 'hidden',
      opacity: 0,
      transition: `opacity ${dur}s, visibility 0s ease ${dur}s`
    };
  };
}

export default Visible;

