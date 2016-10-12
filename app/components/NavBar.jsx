import React, {Component, PropTypes} from 'react'
import {getIcon} from './icons'
import {getImage} from './images'
import css from './NavBar.css'
import NavLink from './NavLink'
import jsvars from './vars'

class NavBar extends Component {

  static propTypes = {
    isMyMediaActive: PropTypes.bool,
    onMyMediaClick: PropTypes.func.isRequired,
    isAlbumsActive: PropTypes.bool,
    onAlbumsClick: PropTypes.func.isRequired
  };

  render() {
    const p = this.props;
    return (
      <div className={css.navbar}>
        <ul className={css.items}>
          <li className={css.navitem}>
            <img className={css.logo} src={getImage('logo')} />
          </li>
          <li className={css.navitem}>
            <NavLink
                iconClass={getIcon('myMedia')}
                label='My Photos'
                active={p.isMyMediaActive}
                onClick={p.onMyMediaClick} />
          </li>
          <li className={css.navitem}>
            <NavLink
                iconClass={getIcon('album')}
                label='Albums'
                active={p.isAlbumsActive}
                onClick={p.onAlbumsClick} />
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;

