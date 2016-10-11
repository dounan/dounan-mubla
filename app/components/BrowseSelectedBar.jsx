import React, {Component, PropTypes} from 'react'
import Button from './Button'
import {getIcon} from './icons'
import SelectedBar from './SelectedBar'

class BrowseSelectedBar extends Component {

  static propTypes = {
    numSelected: PropTypes.number,
    onCloseClick: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired
  };

  render() {
    const p = this.props;
    return (
      <SelectedBar
          numSelected={p.numSelected}
          onCloseClick={p.onCloseClick}
          rightItems={this.renderRightItems()} />
    );
  };

  renderRightItems = () => {
    const p = this.props;
    return [
      <Button
          key='add'
          styleType='text'
          onClick={p.onAddClick}>
        <span className={getIcon('add')} />
      </Button>
    ];
  };
}

export default BrowseSelectedBar;

