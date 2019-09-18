import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import { compose } from 'redux'

import ProgressBar from '../ProgressBar'
import { connectResource } from 'common/utils/resource'


class AccountStatus extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      data: PropTypes.shape({
        contacts_total: PropTypes.number,
        subscription: PropTypes.shape({
          min_number_of_contacts: PropTypes.number,
          max_number_of_contacts: PropTypes.number
        })
      })
    })
  }

  static defaultProps = {
    profile: {
      data: {
        contacts_total: 0,
        subscription: {
          min_number_of_contacts: 0,
          max_number_of_contacts: 0
        }
      }
    }
  }

  render() {
    const data = get(this.props, 'profile.data') || {}
    const numberOfContacts = data.contacts_total
    const maxNumberOfContacts = get(data, 'subscription.max_number_of_contacts', 0)
    const minNumberOfContacts = get(data, 'subscription.min_number_of_contacts', 0)
    const maxNumberOfMails = get(data, 'subscription.number_of_emails', 0)
    const minNumberOfMails = 0
    const isFree = get(data, 'subscription.is_free')
    const balance = data.balance
    const isContactBased = get(data, 'subscription.is_contact_based')
    const limitExceeded = isContactBased && numberOfContacts > maxNumberOfContacts
    return (
      <>
        <div className="row align-items-end mb-2">
          <div className="col">
            <p className="mb-0 font-weight-bold">
              {isContactBased ? <FormattedMessage
                id="accountStatus.numberOfContacts"
                values={{minNumberOfContacts, maxNumberOfContacts}}
              />
              : <FormattedMessage
                id="accountStatus.numberOfMails"
                values={{maxNumberOfMails}}
              />}
            </p>
          </div>
          <div className="col text-right">
            <p className="mb-0 font-weight-bold small">
              {isFree
                ? <FormattedMessage id="accountStatus.free"/>
                : !!data.subscription && <FormattedMessage id="accountStatus.nextPaymentDue" values={{date: data.subscription.end_time}} />}
            </p>
          </div>
        </div>
        <ProgressBar
          className={`mb-2 ${limitExceeded ? 'red' : ''}`}
          valuenow={isContactBased ? numberOfContacts : balance}
          valuemin={isContactBased ? minNumberOfContacts : minNumberOfMails}
          valuemax={isContactBased ? maxNumberOfContacts: maxNumberOfMails}
        />
        <div className={`row ${this.props.isHomePage ? 'mb-4' : ''}`}>
          <div className="col">
              <p className="mb-0 small">
                <FormattedMessage
                  id={isContactBased ? "accountStatus.myContacts" : "accountStatus.mailsLeft"}
                  values={isContactBased ? {content: <b>{numberOfContacts}</b>} : {maxNumberOfMails, balance }}
                />{` `}
                {
                  limitExceeded && <FormattedMessage id="accountStatus.upgrade" />
                }
              </p>
            </div>
            <div className="col text-right">
              {isContactBased && isFree && <p className="mb-1 small">
                <FormattedMessage id="accountStatus.freeMails" values={{ balance: data.balance}}/>
              </p> }
              <p className="mb-0 small">
                {data.subscription && <FormattedMessage
                  id="accountStatus.theBalanceReset"
                  values={{ numOfDay: data.subscription.period_day}}
                />}
              </p>
            </div>
          </div>
        {this.props.isHomePage && <div className="row align-items-end mb-2 small">
          <div className="col">
            <Link to="/upgrade" className="card-link font-weight-bold"><FormattedMessage id="home.upgradeAccount" /></Link>
            {
              !!get(this.props.invoices, 'data.length') &&
              <Link to="/account" className="card-link font-weight-bold"><FormattedMessage id="home.viewBillingHistory" /></Link>
            }
          </div>
        </div> }
      </>
    )
  }
}

export default compose(
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    async: true,
    prefetch: false,
    refresh: true,
  }),
  connectResource({
    namespace: 'invoices',
    endpoint: 'invoices',
    async: true,
    list: true,
    item: false,
    refresh: true,
  }),
)(AccountStatus)
