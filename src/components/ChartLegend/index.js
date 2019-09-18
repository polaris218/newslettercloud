import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

let listKey = 1;

const getListKey = () => `legend_item_${listKey++}`;

export class ChartLegend extends Component {
  static propTypes = {
    children: PropTypes.node,
    data: PropTypes.object,
    labels: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    children: null,
    labels: [],
    data: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
          labels: []
        }
      ]
    }
  };

  getItemsProps() {
    const dataset = this.props.data.datasets[0];
    const { labels } = this.props.data;
    const { backgroundColor, data, subscribers } = dataset;

    return data.map((value, i) => {
      return {
        color: backgroundColor[i],
        subscribers: subscribers[i],
        key: getListKey(),
        value,
        label: labels[i]
      };
    });
  }

  render() {
    return <div className="chart-legend d-inline-flex flex-column justify-content-center">{this.props.children}</div>;
  }
}

export { ChartLegendItem } from './ChartLegendItem';