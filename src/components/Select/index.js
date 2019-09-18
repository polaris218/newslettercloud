import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../lib/utils';

let key = 1;
const getKey = () => (key += 1);

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string
      })
    ),
    onSelect: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string
  };

  static defaultProps = {
    options: [],
    onSelect: noop,
    value: '',
    name: ''
  };

  onSelect = event => {
    this.props.onSelect(event.target.value);
  };

  render() {
    return (
      <select className="custom-select" value={this.props.value} onChange={this.onSelect} name={this.props.name}>
        {this.props.options.map(option => (
          <option key={getKey()} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }
}
