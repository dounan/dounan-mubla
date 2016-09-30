import React, {Component, PropTypes} from 'react'
import TextInput from './TextInput'

const PT_DATA_ITEM = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string.isRequired
    })
]);

const WRAPPER_STYLE = {
  position: 'relative'
};

const INVISIBLE_STYLE = {
  visibility: 'hidden'
};

class SharedTextInput extends Component {

  static propTypes = {
    data: PropTypes.arrayOf(PT_DATA_ITEM)
  };

  render() {
    const {data} = this.props;
    const n = data.length;
    const views = [];
    let val = '';
    for (let i = 0; i < n; i++) {
      const d = data[i];
      if (typeof(d) === 'string') {
        val += d;
      } else {
        views.push(this.renderCursor(i, d, val));
      }
    }
    views.push(this.renderInput(val));
    return (
        <span style={WRAPPER_STYLE}>
          {views}
        </span>
    );
  }

  renderInput = (val) => {
    return (
        <TextInput key="input">
          {val}
        </span>
    );
  };

  renderCursor = (i, cursor, prefix) => {
    // TODO: make the cursor blink
    const style = {
      borderRight: '1px solid ' + cursor.color,
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 1
    }
    return (
        <span key={i} style={style}>
          <span style={INVISIBLE_STYLE}>
            {prefix}
          </span>
        </span>
    );
  };
}

export default SharedTextInput;

