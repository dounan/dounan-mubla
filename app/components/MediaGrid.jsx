import {List, Set} from 'immutable'
import get from 'lodash/get'
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import calcViewport from '../util/calcViewport'
import Grid from './Grid'
import SelectableMediaThumb from './SelectableMediaThumb'
import * as pt from './propTypes'

class MediaGrid extends Component {

  static propTypes = {
    mediaList: PropTypes.arrayOf(pt.MEDIA).isRequired,

    canSelect: PropTypes.bool,
    selectedMediaIds: PropTypes.instanceOf(Set),
    // onItemCheckClick(mediaItem)
    onItemCheckClick: PropTypes.func,
    onItemClick: PropTypes.func,

    maxWidth: PropTypes.number.isRequired,
    maxRowHeight: PropTypes.number.isRequired,
    rowSpacing: PropTypes.number,
    colSpacing: PropTypes.number,

    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
    scrollX: PropTypes.number.isRequired,
    scrollY: PropTypes.number.isRequired,
    viewportBuffer: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this._idToIdx = {};
    this.processMediaList(props);
  }

  componentDidMount() {
    this.updateViewport(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    if (p.mediaList !== nextProps.mediaList) {
      this.processMediaList(nextProps);
    }
    if (p.selectedMediaIds !== nextProps.selectedMediaIds) {
      this.updateSelectedMedia(nextProps);
    }
    if (p.windowWidth !== nextProps.windowWidth ||
        p.windowHeight !== nextProps.windowHeight ||
        p.scrollX !== nextProps.scrollX ||
        p.scrollY !== nextProps.scrollY) {
      this.updateViewport(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const p = this.props;
    const sharedViewProps = {
      canSelect: p.canSelect
    };
    return (
      <Grid
          items={this._gridItems}
          viewsProps={this._viewsProps}
          sharedViewProps={sharedViewProps}
          viewRenderer={SelectableMediaThumb}
          maxWidth={p.maxWidth}
          maxRowHeight={p.maxRowHeight}
          rowSpacing={p.rowSpacing}
          colSpacing={p.colSpacing}
          viewport={this._viewport} />
    );
  }

  handleCheckClick = (mediaItem) => {
    const {onItemCheckClick} = this.props;
    if (onItemCheckClick) {
      onItemCheckClick(mediaItem);
    }
  };

  handleItemClick = (mediaItem) => {
    const {onItemClick} = this.props;
    if (onItemClick) {
      onItemClick(mediaItem);
    }
  };

  processMediaList = (props) => {
    const {mediaList} = props;
    const toViewProps = this.toViewProps.bind(null, props);
    let viewsProps = List();
    let gridItems = List();
    for (let i in mediaList) {
      const mediaItem = mediaList[i];
      this._idToIdx[mediaItem.id] = i;
      viewsProps = viewsProps.push(toViewProps(mediaItem));
      gridItems = gridItems.push(this.toGridItem(mediaItem));
    }
    this._viewsProps = viewsProps;
    this._gridItems = gridItems;
  };

  toViewProps = (props, mediaItem) => {
    const {canSelect, selectedMediaIds, maxRowHeight} = props;
    const isSelected = selectedMediaIds && selectedMediaIds.has(mediaItem.id);
    return {
      media: mediaItem,
      canSelect: canSelect,
      isSelected: isSelected,
      onCheckClick: this.handleCheckClick.bind(null, mediaItem),
      onClick: this.handleItemClick.bind(null, mediaItem),
      targetThumbHeight: maxRowHeight
    };
  };

  toGridItem = (mediaItem) => {
    return {
      id: mediaItem.id,
      aspectRatio: this.aspect(mediaItem)
    };
  };

  aspect = (mediaItem) => {
    const thumb = get(mediaItem, 'images.0');
    return thumb ? thumb.width / thumb.height : 1;
  };

  updateSelectedMedia = (props) => {
    const p = this.props;
    const selected = props.selectedMediaIds.subtract(p.selectedMediaIds);
    const deselected = p.selectedMediaIds.subtract(props.selectedMediaIds);
    selected.forEach((id) => {
      this._viewsProps = this.setSelected(this._viewsProps, id, true);
    });
    deselected.forEach((id) => {
      this._viewsProps = this.setSelected(this._viewsProps, id, false);
    });
  };

  setSelected = (viewsProps, mediaId, selected) => {
    const idx = this._idToIdx[mediaId];
    return viewsProps.updateIn([idx], (p) => ({...p, isSelected: selected}));
  };

  updateViewport = (props) => {
    const {windowWidth, windowHeight, viewportBuffer} = props;
    const clientRect = {
      top: 0,
      left: 0,
      width: windowWidth,
      height: windowHeight
    };
    const elem = ReactDOM.findDOMNode(this);
    const viewport = calcViewport(clientRect, elem, viewportBuffer);
    this._viewport = viewport;
  };
}
 
export default MediaGrid;

