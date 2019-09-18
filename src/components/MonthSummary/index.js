import React, { Component } from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

import { getStats } from 'services/stats'
import serviceStatus from 'services/status'
import Spinner from 'components/Spinner'


export default class MonthSummary extends Component {
  state = {
    error: {},
    data: {
      cancelled_subscriptions: 0,
      new_subscriptions: 0,
      sent_mails: 0,
    },
    status: 'LOADING',
  }

  getStats = async () => {
    const response = await getStats({ from_date: moment().subtract(1, 'month').toISOString()})
    if (response instanceof Error) {
      this.setState({
        error: { message: response.message, status: response.status, reason: response.reason }
      });
    } else {
      this.setState({
        status: serviceStatus.OK,
        error: {},
        data: response
      });
    }
  }

  componentDidMount() {
    this.getStats()
  }

  render() {
    const {
      cancelled_subscriptions: cancelledSubscriptions,
      new_subscriptions: newSubscriptions,
      sent_mails: sentMails,
    } = this.state.data
    return (
      <div className="card mw-25">
        <Spinner show={this.state.status === 'LOADING'} />
        <h5 className="card-header"><FormattedMessage id="monthSummary.heading" /></h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <p className="mb-0 month-summary-item">
              <span><FormattedMessage id="monthSummary.mails" /></span>
              <span className="font-weight-bold text-body lead float-right">{sentMails}</span>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 month-summary-item">
              <span><FormattedMessage id="monthSummary.newSub" /></span>
              <span className="font-weight-bold text-body lead float-right">{newSubscriptions}</span>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 month-summary-item">
              <span><FormattedMessage id="monthSummary.cancelSub" /></span>
              <span className="font-weight-bold text-body lead float-right">{cancelledSubscriptions}</span>
            </p>
          </li>
        </ul>
      </div>
    )
  }
}
