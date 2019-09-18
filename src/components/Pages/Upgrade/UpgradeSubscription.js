import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import AccountStatus from 'components/AccountStatus'
import Spinner from 'components/Spinner'
import ButtonInput from 'common/forms/inputs/ButtonInput'
import SubscriptionItem from './SubscriptionItem'
import { currencyOptions, periodOptions } from 'common/utils/constants'
import EmptyList from 'components/EmptyList'


export default function UpgradeSubscription({ selectPeriod, period, onChange, contacts, articlesData, articles, selectArticle, profile, currency, selectCurrency, discount }) {
  const isContactBased = get(profile, 'data.subscription.is_contact_based')
  const isFirstUpgrade = get(profile, 'data.subscription.is_free')
  const canChangeCurrency = get(profile, 'data.can_change_currency')
  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <h3 className="mb-4"><FormattedMessage id="upgrade.myCurrentSubscription" /></h3>
          <div className="card bg-light mb-4">
            <div className="card-body pt-4 pb-4">
              <AccountStatus />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <h3><FormattedMessage id="upgrade.upgradeSubscription" /></h3>
        </div>
      </div>
      {
        (get(articles, 'data.length') || articles.isLoading) &&
        <div className="row mb-5 justify-content-between">
          <div className="col-3">
            {
              isContactBased &&
              <div className="form-group">
                <label htmlFor="amount-contacts"><FormattedMessage id="upgrade.howManyContacts" /></label>
                <input type="number" className="form-control" id="contacts" value={contacts} onChange={onChange} />
              </div>
            }
            {
              canChangeCurrency &&
              <div className="form-group">
                <label><FormattedMessage id="upgrade.chooseCurrency" /></label>
                <ButtonInput onChange={selectCurrency} options={currencyOptions} value={currency} />
              </div>
            }
            {
              isFirstUpgrade &&
              <div className="form-group">
                <label><FormattedMessage id="upgrade.payMonthly" /></label>
                <ButtonInput onChange={selectPeriod} value={period} options={periodOptions} />
              </div>
            }
          </div>
          <div className="col-8">
            <Spinner show={articles.isLoading} />
            <ul className="list-group">
              {
                !!articlesData.length && !isFirstUpgrade && !!get(discount, 'data.order_price') &&
                <li className="list-group-item list-group-item-action flex-column align-items-start list-group-item-head">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <span className="font-weight-bold">
                      {
                        isContactBased ?
                        <>{get(profile, 'data.subscription.max_number_of_contacts')} {` `}<FormattedMessage id="common.contacts" /></> :
                        <>{get(profile, 'data.subscription.number_of_emails')} {` `}<FormattedMessage id="common.mails" /></>
                      }
                    </span>
                    <span className="font-weight-bold">{get(discount, 'data.order_price')}.00 {` `} {profile.data.currency_code}/<FormattedMessage id="common.month" /></span>
                    <div className="col-4 pr-0">
                      <button
                        className="d-block btn btn-secondary w-100"
                        disabled
                      >
                        <FormattedMessage id="upgrade.currentSubscription" />
                      </button>
                    </div>
                  </div>
                </li>

              }
              {
                articlesData.map(item => (
                  <SubscriptionItem key={item.name + item} item={item} isContactBased={isContactBased} profile={profile} selectArticle={selectArticle} isFirstUpgrade={isFirstUpgrade} subscriptionData={get(profile, 'data.subscription', {})} />
                ))
              }
            </ul>
          </div>
        </div>
      }
      {
        !get(articles, 'data.length') && !articles.isLoading &&
        <EmptyList
          placeholderTitle={<FormattedMessage id="upgrade.largestAccount.title" />}
          placeholderDescription={
            <FormattedMessage id="upgrade.largestAccount.description" values={{ link: <a href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL_LINK}`}><FormattedMessage id="upgrade.largestAccount.getInTouch" /></a> }} />
          }
        />
      }
    </>
  )
}
