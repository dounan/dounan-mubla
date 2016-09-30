import {List, Set} from 'immutable'
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
    this.state = Object.assign({
      viewport: null
    }, this.processMediaList(props));
  }

  componentDidMount() {
    this.updateViewport(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const p = this.props;
    if (p.mediaList !== nextProps.mediaList) {
      this.setState(this.processMediaList(nextProps));
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
    const {viewsProps, gridItems, viewport} = this.state;
    const sharedViewProps = {
      canSelect: p.canSelect
    };
    return (
      <Grid
          items={gridItems}
          viewsProps={viewsProps}
          sharedViewProps={sharedViewProps}
          viewRenderer={SelectableMediaThumb}
          maxWidth={p.maxWidth}
          maxRowHeight={p.maxRowHeight}
          rowSpacing={p.rowSpacing}
          colSpacing={p.colSpacing}
          viewport={viewport} />
    );
  }

  handleCheckClick = (mediaItem) => {
    const {onItemCheckClick} = this.props;
    if (onItemCheckClick) {
      onItemCheckClick(mediaItem);
    }
  };

  processMediaList = (props) => {
    const {mediaList, canSelect, selectedMediaIds} = props;
    const toViewProps = this.toViewProps.bind(null, canSelect, selectedMediaIds);
    let viewsProps = List();
    let gridItems = List();
    for (let i in mediaList) {
      const mediaItem = mediaList[i];
      this._idToIdx[mediaItem.id] = i;
      viewsProps = viewsProps.push(toViewProps(mediaItem));
      gridItems = gridItems.push(this.toGridItem(mediaItem));
    }
    return {
      viewsProps,
      gridItems
    };
  };

  toViewProps = (canSelect, selectedMediaIds, mediaItem) => {
    const isSelected = selectedMediaIds && selectedMediaIds.has(mediaItem.id);
    return {
      media: mediaItem,
      canSelect: canSelect,
      isSelected: isSelected,
      onCheckClick: this.handleCheckClick.bind(null, mediaItem)
    };
  };

  toGridItem = (mediaItem) => {
    const thumb = mediaItem.images[0];
    return {
      id: mediaItem.id,
      aspectRatio: thumb.width / thumb.height
    };
  };

  updateSelectedMedia = (props) => {
    const p = this.props;
    let viewsProps = this.state.viewsProps;
    const selected = props.selectedMediaIds.subtract(p.selectedMediaIds);
    const deselected = p.selectedMediaIds.subtract(props.selectedMediaIds);
    selected.forEach((id) => {
      viewsProps = this.select(id);
    });
    deselected.forEach((id) => {
      viewsProps = this.deselect(id);
    });
    this.setState({viewsProps});
  };

  select = (mediaId) => this.setSelected(true, mediaId);

  deselect = (mediaId) => this.setSelected(false, mediaId);

  setSelected = (selected, mediaId) => {
    const viewsProps = this.state.viewsProps;
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
    this.setState({viewport});
  };
}
 
export default MediaGrid;

