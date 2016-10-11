import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import Link from './Link'
import css from './NavLink.css'

class NavLink extends Component {

  static propTypes = {
    iconClass: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {iconClass, label, active, onClick} = this.props;
    const wrapperClassName = classNames(css.navlink, {
      [css.active]: active
    });
    return (
      <Link className={wrapperClassName} onClick={onClick}>
        <span className={classNames(css.icon, iconClass)} />
        <span>{label}</span>
      </Link>
    );
  }
}

export default NavLink;

