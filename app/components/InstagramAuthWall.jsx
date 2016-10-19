import React, {Component, PropTypes} from 'react'
import Button from './Button'
import jsvars from './vars'

const AUTH_STYLE = {
  textAlign: 'center'
};

const INSTR_STYLE = {
  color: jsvars.gray,
  fontSize: 24,
  marginBottom: 20
};

/**
 * If there is no instagram token, renders UI to get token.
 * Otherwise just renders the children within the component div.
 */
class InstagramAuthWall extends Component {

  static propTypes = {
    hasToken: PropTypes.bool,
    onAuthClick: PropTypes.func.isRequired
  };

  render() {
    const {hasToken, onAuthClick, children, ...other} = this.props;
    return (
      <div {...other}>
        {hasToken ? children : this.renderAuth()}
      </div>
    );
  };

  renderAuth = () => {
    const {onAuthClick} = this.props;
    return (
      <div style={AUTH_STYLE}>
        <div style={INSTR_STYLE}>
          Login to Instagram to get started.
        </div>
        <Button styleType='primary' onClick={onAuthClick}>
          Login
        </Button>
      </div>
    );
  };
}

export default InstagramAuthWall;

