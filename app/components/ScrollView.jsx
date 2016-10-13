import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import BufferedScroll from '../util/BufferedScroll'

const WRAPPER_STYLE = {
  overflow: 'auto',
  width: '100%',
  height: '100%'
};

// Check to see if any callbacks should be fired if these props change.
const HANDLE_SCROLL_ON_PROPS = [
  'onTopEdge', 'onRightEdge', 'onBottomEdge', 'onLeftEdge',
  'topBuffer', 'rightBuffer', 'bottomBuffer', 'leftBuffer',
  'gridW', 'gridH'
];

/**
 * Detects when the element's edges are within the window and calls the
 * appropriate callback.
 */
class ScrollView extends Component {

  static propTypes = {
    // onBufferedScroll({scrollTop, scrollLeft})
    onBufferedScroll: PropTypes.func,

    // Callbacks are called when an edge comes into view from the respective
    // window edge.
    // onTopEdge()
    onTopEdge: PropTypes.func,
    // onRightEdge()
    onRightEdge: PropTypes.func,
    // onBottomEdge()
    onBottomEdge: PropTypes.func,
    // onLeftEdge()
    onLeftEdge: PropTypes.func,

    // The buffers determine the distance from the respective edge at which the
    // callbacks begind firing.
    // For example, if bottomBuffer is set to 200, the onBottomEdge callback
    // will start firing when the child elements are scrolled to within 200px
    // of the maximum downward scroll.
    topBuffer: PropTypes.number,
    rightBuffer: PropTypes.number,
    bottomBuffer: PropTypes.number,
    leftBuffer: PropTypes.number,

    // The grid size determines how often the callbacks are called.
    // See BufferedScroll for more info.
    gridW: PropTypes.number,
    gridH: PropTypes.number
  };

  static defaultProps = {
    topBuffer: 0,
    rightBuffer: 0,
    bottomBuffer: 0,
    leftBuffer: 0,
    gridW: 100,
    gridH: 100
  };

  componentDidMount() {
    const p = this.props;
    const elem = ReactDOM.findDOMNode(this);
    this._bufferedScroll = new BufferedScroll(elem, p.gridW, p.gridH);
    this._bufferedScroll.addListener('scroll', this.handleScroll);
    this.handleScroll();
  };

  componentDidUpdate(prevProps, prevState) {
    const p = this.props;
    if (p.gridW !== prevProps.gridW || p.gridH !== prevProps.gridH) {
      this._bufferedScroll.setGridW(p.gridW);
      this._bufferedScroll.setGridH(p.gridH);
    }
    const updateScroll = HANDLE_SCROLL_ON_PROPS.find((k) => p[k] !== prevProps[k]);
    const {offsetWidth, offsetHeight} = this.refs['content'];
    if (updateScroll
        || (offsetWidth !== this._lastContentWidth)
        || (offsetHeight !== this._lastContentHeight)) {
      this.handleScroll();
    }
  };

  componentWillUnmount() {
    this._bufferedScroll.removeListener('scroll', this.handleScroll);
  };

  render() {
    const {
      onBufferedScroll,
      onTopEdge,
      onRightEdge,
      onBottomEdge,
      onLeftEdge,
      topBuffer,
      rightBuffer,
      bottomBuffer,
      leftBuffer,
      gridW,
      gridH,
      children,
      ...other
    } = this.props;
    const style = Object.assign({}, WRAPPER_STYLE, other.style);
    return (
      <div {...other} style={style}>
        <div ref="content">
          {children}
        </div>
      </div>
    );
  };

  handleScroll = () => {
    const p = this.props;
    const elem = ReactDOM.findDOMNode(this);
    const {scrollTop, scrollLeft, scrollHeight, scrollWidth, offsetWidth, offsetHeight} = elem;
    if (p.onBufferedScroll) {
      p.onBufferedScroll({scrollTop, scrollLeft});
    }
    if (p.onTopEdge && scrollTop <= p.topBuffer) {
      p.onTopEdge();
    }
    if (p.onLeftEdge && scrollLeft <= p.leftBuffer) {
      p.onLeftEdge();
    }
    if (p.onBottomEdge && scrollHeight - scrollTop <= offsetHeight + p.bottomBuffer) {
      p.onBottomEdge();
    }
    if (p.onRightEdge && scrollWidth - scrollLeft <= offsetWidth + p.rightBuffer) {
      p.onRightEdge();
    }
    const content = this.refs['content'];
    this._lastContentWidth = content.offsetWidth;
    this._lastContentHeight = content.offsetHeight;
  };
}

export default ScrollView;

