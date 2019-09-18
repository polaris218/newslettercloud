import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'

import './styles.scss';


export const ClickedLegendItem = ({ label = '', value = 0, subscribers = 0, changeViewState }) => {
  return (
    <li className="clicked-legend-item">
      <p className="font-weight-semi-bold">
        <span>{value}% {label}</span>
      </p>
      <p className="small">
        <span className={subscribers && "btn-link"} onClick={() => changeViewState(label, subscribers)}>
          <span><FormattedMessage id="charts.countOfSubscribers" values={{subscribers}}/></span>
        </span>
      </p>
    </li>
  );
};

ClickedLegendItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  subscribers: PropTypes.number
};

class ClickedLegend extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  static defaultProps = {
    data: []
  };

  changeViewState = (label, subscribers) => {
    if(!subscribers) return
    let data 
    if(label === 'have cancelled') {
      data = {
        tabKey: 'recipients',
        label: 'Cancelled', 
        endpoint: 'unsubscribed',
      }
    } else {
      data = {
        tabKey: 'links',
      }
    }
    this.props.history.push({
      state: data
    })
  }

  render() {
    return (
      <ul className="clicked-legend">
        {this.props.data.map(props => <ClickedLegendItem {...props} key={props.label} changeViewState={this.changeViewState} />)}
      </ul>
    );
  }
}

export default withRouter(ClickedLegend)
