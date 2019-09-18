import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../lib/utils';

import './styles.scss';

export default class FilterRadio extends Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    name: '',
    items: [],
    value: '',
    onChange: noop
  };

  onChange = event => {
    this.props.onChange(this.props.name, event.target.value);
  };

  render() {
    const { name } = this.props;

    return (
      <div className="filter-radio d-flex flex-column align-items-start">
        {this.props.items.map((item, i) => (
          <label className="mb-0" key={name + i}>
            <input
              type="radio"
              name={name}
              value={item.value}
              checked={this.props.value === item.value}
              onChange={this.onChange}
              className="sr-only"
            />
            <span className="filter-radio-name btn-link">{item.name}</span>
          </label>
        ))}
      </div>
    );
  }
}
