import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

import './styles.scss';

export default class ChartComponent extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object,
    options: PropTypes.object
  };

  static defaultProps = {
    data: {},
    options: {}
  };

  constructor(props) {
    super(props);
    this.canvasEl = React.createRef();
  }

  componentDidMount() {
    this.chartjs = new Chart(this.canvasEl.current, {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options
    });
  }

  componentDidUpdate() {
    this.chartjs.data = this.props.data
    this.chartjs.update(0);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }

  render() {
    return <canvas ref={this.canvasEl} />;
  }
}

export const defaultChartData = {
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
      labels: []
    }
  ]
};
