import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import {getIcon} from './icons'
import css from './SearchInput.css'
import TextInput from './TextInput'

class SearchInput extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    // onSearchChange(newSearchQuery)
    onSearchChange: PropTypes.func.isRequired
  };

  render() {
    const {onSearchChange, ...p} = this.props;
    return (
      <div className={css.wrapper}>
        <TextInput
            ref='input'
            {...p}
            styleType='shaded'
            className={css.input}
            onChange={this.handleChange} />
        <div className={css.action}>
          {p.value ? this.renderClear() : this.renderSearch()}
        </div>
      </div>
    );
  };

  renderClear = () => {
    return (
      <Button
          styleType='text'
          onClick={this.handleClear}>
        <span className={getIcon('close')} />
      </Button>
    );
  };

  renderSearch = () => {
    return (
      <span className={getIcon('search')} />
    );
  };

  handleChange = (evt) => {
    this.props.onSearchChange(evt.target.value);
  };

  handleClear = (evt) => {
    this.props.onSearchChange('');
    ReactDOM.findDOMNode(this.refs.input).focus();
  };
}

export default SearchInput;

