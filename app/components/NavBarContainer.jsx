import debounce from 'lodash/debounce'
import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import NavBar from './NavBar'
import * as pt from './propTypes'

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curSearchQuery: props.searchQuery
    };
    this._debouncedSearch = debounce(this.doSearch, 400);
  };

  componentWillReceiveProps(nextProps) {
    const s = this.state;
    if (s.curSearchQuery !== nextProps.searchQuery) {
      this.setState({curSearchQuery: nextProps.searchQuery});
    }
  };

  render() {
    const s = this.state;
    return (
      <NavBar
          {...this.props}
          searchQuery={s.curSearchQuery}
          onSearchChange={this.handleSearchChange} />
    );
  };

  handleSearchChange = (q) => {
    const {dispatch} = this.props;
    this.setState({
      curSearchQuery: q
    });
    this._debouncedSearch(q);
  };

  doSearch = (q) => {
    this.props.doSearch(q);
  };
}

function mapStateToProps(state, ownProps) {
  const {routeLocation} = ownProps;
  const {pathname} = routeLocation;
  return {
    isMyMediaActive: pathname === '/',
    isSearchActive: pathname === '/search',
    searchQuery: get(routeLocation, 'query.q', ''),
    isAlbumsActive: pathname === '/albums'
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMyMediaClick: () => dispatch(actions.gotoMyMedia()),
    onAlbumsClick: () => dispatch(actions.gotoAlbumList()),
    doSearch: (q) => dispatch(actions.gotoSearch(q))
  };
};

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(Container);

NavBarContainer.propTypes = {
  routeLocation: pt.ROUTE_LOCATION
};

export default NavBarContainer;

