import {List} from 'immutable'
import React, {Component, PropTypes} from "react"
import shallowCompare from 'react-addons-shallow-compare'
import ImmutablePropTypes from 'react-immutable-proptypes'
import * as pt from './propTypes'
import Scattered from './Scattered'

const PT_GRID_ITEM = PropTypes.shape({
  id: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired
});

class Grid extends Component {

  static propTypes = {
    items: ImmutablePropTypes.listOf(PT_GRID_ITEM).isRequired,
    viewsProps: PropTypes.instanceOf(List).isRequired,
    sharedViewProps: PropTypes.object,
    viewRenderer: PropTypes.func.isRequired,

    maxWidth: PropTypes.number.isRequired,
    maxRowHeight: PropTypes.number.isRequired,
    rowSpacing: PropTypes.number,
    colSpacing: PropTypes.number,
    // Optimization to restrict rendering to only a specfiic viewport.
    viewport: pt.VIEWPORT
  };

  constructor(props) {
    super(props);
    this._scatteredItems = List();
    this.layout(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    if (p.items !== nextProps.items ||
        p.maxWidth !== nextProps.maxWidth ||
        p.maxRowHeight !== nextProps.maxRowHeight) {
      this.layout(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {viewsProps, sharedViewProps, viewRenderer, maxWidth, viewport} = this.props;
    const style = {
      width: maxWidth
    };
    return (
      <Scattered
          items={this._scatteredItems}
          viewsProps={viewsProps}
          sharedViewProps={sharedViewProps}
          viewRenderer={viewRenderer}
          viewport={viewport}
          style={style} />
    );
  }

  layout = (props) => {
    const {items, maxWidth, maxRowHeight, rowSpacing, colSpacing} = props;
    let scatteredItems = List();
    let nextTop = 0;
    let rowStartIdx = 0;
    let rowWidth = 0;
    items.forEach((item, i) => {
      const {id, aspectRatio} = item;
      const w = aspectRatio * maxRowHeight;
      scatteredItems = scatteredItems.push({
        id,
        top: nextTop,
        left: rowWidth,
        width: w,
        height: maxRowHeight
      });
      rowWidth += w;
      if (rowWidth >= maxWidth) {
        const numSpaces = i - rowStartIdx;
        const totalSpace = numSpaces * colSpacing;
        const r = (maxWidth - totalSpace) / (rowWidth - totalSpace);
        this.scaleRow(scatteredItems, r, colSpacing, rowStartIdx, i);
        nextTop += maxRowHeight * r + rowSpacing;
        rowStartIdx = i + 1;
        rowWidth = 0;
      } else {
        rowWidth += colSpacing;
      }
    });
    this._scatteredItems = scatteredItems;
  };

  scaleRow = (scatteredItems, ratio, colSpacing, start, end) => {
    let nextX = 0;
    for (let i = start; i <= end; i++) {
      const item = scatteredItems.get(i);
      item.left = nextX;
      item.width *= ratio;
      item.height *= ratio;
      nextX += item.width + colSpacing;
    }
  };
}

export default Grid;

