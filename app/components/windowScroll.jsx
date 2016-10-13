import React, {Component, PropTypes} from "react"

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

  const gridCol = (x) => Math.floor(x / gridW);
  const gridRow = (y) => Math.floor(y / gridH);

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
        window.addEventListener('scroll', this.updateScroll);
      }

      componentWillUnmount() {
        window.removeEventListener('scroll', this.updateScroll);
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
        const {windowScrollX, windowScrollY} = this.state;
        if (gridCol(windowScrollX) !== gridCol(window.scrollX) ||
            gridRow(windowScrollY) !== gridRow(window.scrollY)) {
          this.setState({
            windowScrollX: window.scrollX,
            windowScrollY: window.scrollY
          });
        }
      };
    }

    return WindowScroll;
  }
}

