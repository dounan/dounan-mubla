import React, {Component, PropTypes} from "react"
import debounce from 'lodash/debounce'

function getDisplayName(WrappedComponent) {
  const name = WrappedComponent.displayName || WrappedComponent.name || "Component";
  return "WindowSize(" + name + ")";
}

/**
 * Higher order component that passes the windowWidth and windowHeight to the
 * wrapped component.
 */
export default function windowSize(resizeDebounceMs=0) {

  return function wrapWithWindowSize(WrappedComponent) {

    class WindowSize extends Component {

      static displayName = getDisplayName(WrappedComponent);

      constructor(props) {
        super(props);
        this.state = this.getSize();
        this._debouncedUpdateSize = debounce(this.updateSize, resizeDebounceMs);
      }

      componentDidMount() {
        window.addEventListener('resize', this._debouncedUpdateSize);
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this._debouncedUpdateSize);
      }

      render() {
        const {windowWidth, windowHeight} = this.state;
        return (
          <WrappedComponent
              {...this.props}
              windowWidth={windowWidth}
              windowHeight={windowHeight} />
        );
      }

      updateSize = () => {
        this.setState(this.getSize());
      };

      getSize = () => {
        return {
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        };
      };
    }

    return WindowSize;
  }
}

