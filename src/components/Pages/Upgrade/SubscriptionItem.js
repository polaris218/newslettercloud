import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { getDefaultDate } from 'common/utils/formatDate'


export default class SubscriptionItem extends Component {
  state = {
    showCards: false,
  }

  showCardsTrigger = () => {
    this.setState({ showCards: !this.state.showCards })
  }

  render() {
    const { item, isContactBased, profile, selectArticle, isFirstUpgrade, subscriptionData } = this.props
    return (
      <li className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <span className="font-weight-bold">
            {
              isContactBased ?
              <>{item.amount_contacts} {` `}<FormattedMessage id="common.contacts" /></> :
              <>{item.amount} {` `}<FormattedMessage id="common.mails" /></>
            }
          </span>
          <span className="font-weight-bold">{item.price}.00 {` `} {profile.data.currency_code}/<FormattedMessage id="common.month" /></span>
          <div className="col-4 pr-0">
            {
              isFirstUpgrade ?
              <button
                className="btn btn-success w-100"
                to="/upgrade/information"
                onClick={() => selectArticle(item, 0)}
              >
                <FormattedMessage id="common.upgrade" />
              </button> :
              <button className="btn btn-success w-100" onClick={this.showCardsTrigger}>
                <FormattedMessage id="common.upgrade" />
              </button>

            }
          </div>
        </div>
        {
          this.state.showCards &&
          <div className="d-flex justify-content-between pt-2">
            <div className="card col mr-2">
              <div className="card-body">
                <strong><FormattedMessage id="upgrade.startUpgradeNow" /></strong><br/>
                <small><strong>{getDefaultDate()}</strong> - <strong>{getDefaultDate(subscriptionData.end_time)}</strong>. <FormattedMessage id="upgrade.startTheUpgradeRightNowAndPay" /></small><br/>
                <Link
                  className="btn btn-link p-0 mt-2"
                  to="/upgrade/information"
                  onClick={() => selectArticle(item, 0)}
                >
                  <strong><FormattedMessage id="upgrade.upgradeNow" /></strong>
                </Link>
              </div>
            </div>
            <div className="card col ml-2">
              <div className="card-body">
                <strong><FormattedMessage id="upgrade.startUpgradeLater" /></strong><br/>
                <small><strong>{getDefaultDate(subscriptionData.end_time)}</strong>. <FormattedMessage id="upgrade.startTheUpgradeAtTheBeginning" /></small><br/>
                <Link
                  className="btn btn-link p-0 mt-2"
                  to="/upgrade/information"
                  onClick={() => selectArticle(item, 1)}
                >
                  <strong><FormattedMessage id="upgrade.upgradeLater" /></strong>
                </Link>
              </div>
            </div>
          </div>
        }
      </li>
    )
  }
}
