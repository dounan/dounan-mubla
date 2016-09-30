import {List} from 'immutable'
import rbush from 'rbush'
import React, {Component, PropTypes} from "react"
import shallowCompare from 'react-addons-shallow-compare'
import ImmutablePropTypes from 'react-immutable-proptypes'
import * as pt from './propTypes'

const PT_SCATTER_ITEM = PropTypes.shape({
  id: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zIndex: PropTypes.number
});

/**
 * Render items within absolute positioned divs.
 */
class Scattered extends Component {

  static propTypes = {
    items: ImmutablePropTypes.listOf(PT_SCATTER_ITEM).isRequired,
    viewsProps: PropTypes.instanceOf(List).isRequired,
    sharedViewProps: PropTypes.object,
    viewRenderer: PropTypes.func.isRequired,
    // Optimization to restrict rendering to only a specfiic viewport.
    // The viewport coordinates are relative to this component's coordinate
    // system. So a 100x100 viewport at (0, 0) will always only render objects
    // that fall in the the 100x100 square at the top left of this component.
    viewport: pt.VIEWPORT
  };

  constructor(props) {
    super(props);
    const indexState = this.indexItems(props.items);
    this.state = {
      ...indexState,
      viewportRbushItems: this.searchViewport(indexState.rbushIndex, props.viewport)
    };
  };

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    let rbushIndex = this.state.rbushIndex;
    if (p.items !== nextProps.items) {
      const indexState = this.indexItems(nextProps.items);
      rbushIndex = indexState.rbushIndex;
      this.setState(indexState);
    }
    if (p.items !== nextProps.items ||
        p.viewport !== nextProps.viewport) {
      this.setState({
        viewportRbushItems: this.searchViewport(rbushIndex, nextProps.viewport)
      });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  };

  render() {
    const {width, height} = this.state;
    const wrapperStyle = {
      position: 'relative',
      width,
      height
    };
    return (
      <div style={wrapperStyle}>
        {this.renderItems()}
      </div>
    );
  };

  renderItems = () => {
    const {viewportRbushItems} = this.state;
    if (viewportRbushItems) {
      return viewportRbushItems.map(this.renderRbushItem);
    } else {
      return this.props.items.map(this.renderItem);
    }
  };

  renderRbushItem = (rbushItem) => this.renderItemIdx(rbushItem.idx);

  renderItem = (item, i) => this.renderItemIdx(i);

  renderItemIdx = (idx) => {
    // Capitalize viewRenderer to let JSX know it is a component.
    const {items, viewsProps, sharedViewProps, viewRenderer: ViewRenderer} = this.props;
    const {id, top, left, width, height, zIndex} = items.get(idx);
    const divStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translate3d(${left}px, ${top}px, 0px)`,
      width,
      height,
      zIndex
    };
    const vp = Object.assign({}, sharedViewProps, viewsProps.get(idx));
    return (
      <div key={id} style={divStyle}>
        <ViewRenderer key={id} {...vp} />
      </div>
    );
  };

  indexItems = (items) => {
    const rbushIndex = rbush();
    const rbushItems = [];
    let width = 0;
    let height = 0;
    items.forEach((item, i) => {
      width = Math.max(width, item.left + item.width);
      height = Math.max(height, item.top + item.height);
      rbushItems.push(this.toRbushItem(item, i));
    });
    rbushIndex.load(rbushItems);
    return {
      rbushIndex,
      width,
      height
    };
  };

  toRbushItem = (item, i) => ({
    minX: item.left,
    maxX: item.left + item.width,
    minY: item.top,
    maxY: item.top + item.height,
    idx: i
  });

  searchViewport = (rbushIndex, viewport) => {
    if (!rbushIndex || !viewport) {
      return null;
    }
    return rbushIndex.search({
      minX: viewport.left,
      minY: viewport.top,
      maxX: viewport.left + viewport.width,
      maxY: viewport.top + viewport.height
    });
  };
}

export default Scattered;

