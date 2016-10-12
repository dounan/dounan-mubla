import React, {Component, PropTypes} from 'react'
import Button from './Button'

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
      <Button onClick={onAuthClick}>
        Authorize Instagram
      </Button>
    );
  };
}

export default InstagramAuthWall;

