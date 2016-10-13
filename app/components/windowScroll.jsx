import React, {Component, PropTypes} from "react"
import BufferedScroll from '../util/BufferedScroll'

function getDisplayName(WrappedComponent) {
  const name = WrappedComponent.displayName || WrappedComponent.name || "Component";
  return "WindowScroll(" + name + ")";
}

/**
 * Higher order component that passes the windowScrollX and windowScrollY to the
 * wrapped component.
 *
 * If you imagine windowScrollX and windowScrollY as a point in a tiled grid
 * with each tile having dimensions gridW x gridH, the scroll values passed to
 * the wrapped component will only change when the window is scrolled into a
 * new tile. Small tile dimensions will cause updates often, which could be
 * inefficient if your the wrapped component is rerendering on every change.
 */
export default function windowScroll(gridW=1, gridH=1) {

  return function wrapWithWindowScroll(WrappedComponent) {

    class WindowScroll extends Component {

      static displayName = getDisplayName(WrappedComponent);

      constructor(props) {
        super(props);
        this.state = {
          windowScrollX: window.scrollX,
          windowScrollY: window.scrollY
        }
      }

      componentDidMount() {
        this._bufferedScroll = new BufferedScroll(window, gridW, gridH);
        this._bufferedScroll.addListener('scroll', this.updateScroll);
      }

      componentWillUnmount() {
        this._bufferedScroll.removeListener('scroll', this.updateScroll);
      }

      render() {
        const {windowScrollX, windowScrollY} = this.state;
        return (
          <WrappedComponent
              {...this.props}
              windowScrollX={windowScrollX}
              windowScrollY={windowScrollY} />
        );
      }

      updateScroll = () => {
        console.log('update scroll');
        this.setState({
          windowScrollX: window.scrollX,
          windowScrollY: window.scrollY
        });
      };
    }

    return WindowScroll;
  }
}

