import React from 'react'
import { Redirect } from 'react-router-dom'
import { isEmpty, get } from 'lodash'
import { FormattedMessage } from 'react-intl'
import UpgradeSummaryContainer from './UpgradeSummaryContainer'
import moment from 'moment'

import AddressForm from 'components/Pages/Account/partials/ProfilePartial/AccountOwner/AddressForm'
import InvoiceSettingsContainer from 'components/Pages/Account/partials/ProfilePartial/AccountOwner/InvoiceSettingsContainer'
import BillingAddressFromContainer from 'components/Pages/Account/partials/ProfilePartial/AccountOwner/BillingAddressFromContainer'


export default function UpgradeInformation(props) {
  if(isEmpty(props.articleData.data)) return <Redirect to="/upgrade" />
  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <h1><FormattedMessage id="upgrade.yourInformation" /></h1>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-8">
          <div className="card mb-5">
          <div className="card-body">
            <h4 className="card-title"><FormattedMessage id="upgrade.accountOwner" /></h4>
            <p className="card-text text-muted">
              <FormattedMessage id="upgrade.yourAddress" />
            </p>
            <AddressForm {...props} disableButton={true} countryValue={get(props.form, 'country')} isloading={props.address.isLoading} />
          </div>
        </div>
        <div className="card mb-5">
          <div className="card-body">
            <h4 className="card-title"><FormattedMessage id="upgrade.invoiceSettings" /></h4>
            <InvoiceSettingsContainer viewBilling={props.viewBilling} isBilling={props.isBilling} />
          </div>
        </div>
        {
          props.isBilling &&
          <div className="card mb-5">
            <div className="card-body">
              <h4 className="card-title"><FormattedMessage id="upgrade.billingAddress" /></h4>
              <BillingAddressFromContainer />
            </div>
          </div>
        }
          <div className="mb-4 text-right">
            <button className="btn btn-success mb-4" onClick={props.onSubmit}><FormattedMessage id="common.continue" /></button>
          </div>
        </div>
        <div className="col-4">
          <div className="card mb-5 bg-light">
            <div className="card-body">
              <h4 className="card-title"><FormattedMessage id="common.yourOrder" /></h4>
              <p className="card-text">
                <span className="d-block font-weight-bold">{props.articleData.data.name}</span>
                <i className="d-block text-muted">{props.articleData.data.months === 1 ? 'Monthly' : 'Yearly'} <FormattedMessage id="common.subscription" /></i>
              </p>
              <p className="card-text">
                <span className="d-block font-weight-bold">
                  {props.articleData.data.price} {props.profile.data.currency_code}/<FormattedMessage id="common.month" />
                </span>
                <i className="d-block text-muted">
                  {props.articleData.data.price + props.articleData.data.price / 4} {props.profile.data.currency_code}/<FormattedMessage id="common.month" />
                </i>
              </p>
              <p className="card-text small">
                <FormattedMessage id={props.articleData.data.months === 1 ? 'upgrade.youWillBeCharged' : 'upgrade.payYearly'} values={{ day: moment().format('D') }} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
