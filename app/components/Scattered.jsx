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
    this.indexItems(props.items);
    this.updateViewportItems(props.viewport);
  };

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    if (p.items !== nextProps.items) {
      this.indexItems(nextProps.items);
    }
    if (p.items !== nextProps.items ||
        p.viewport !== nextProps.viewport) {
      // Must come after updating indexItems.
      this.updateViewportItems(nextProps.viewport);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  };

  render() {
    const wrapperStyle = {
      position: 'relative',
      width: this._width,
      height: this._height
    };
    return (
      <div style={wrapperStyle}>
        {this.renderItems()}
      </div>
    );
  };

  renderItems = () => {
    if (this._viewportRbushItems) {
      return this._viewportRbushItems.map(this.renderRbushItem);
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
    this._rbushIndex = rbushIndex;
    this._width = width;
    this._height = height;
  };

  toRbushItem = (item, i) => ({
    minX: item.left,
    maxX: item.left + item.width,
    minY: item.top,
    maxY: item.top + item.height,
    idx: i
  });

  updateViewportItems = (viewport) => {
    this._viewportRbushItems = this.searchViewport(this._rbushIndex, viewport);
  };

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

