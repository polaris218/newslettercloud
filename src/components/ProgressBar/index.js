import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
  static propTypes = {
    valuenow: PropTypes.number,
    valuemin: PropTypes.number,
    valuemax: PropTypes.number,
    className: PropTypes.string
  };

  static defaultProps = {
    valuenow: 0,
    valuemin: 0,
    valuemax: 0,
    className: ''
  };

  render() {
    const { valuemax, valuemin, valuenow } = this.props;
    const interval = valuemax - valuemin;
    const offset = valuenow - valuemin;
    const width = interval ? 100 * offset / interval : 0;

    return (
      <div className={`progress ${this.props.className}`}>
        <div className="progress-bar" style={{ width: `${width}%` }} />
      </div>
    );
  }
}
