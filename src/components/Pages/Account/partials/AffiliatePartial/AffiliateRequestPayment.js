import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import AddressForm from 'components/Pages/Account/partials/ProfilePartial/AccountOwner/AddressForm'
import BillingAddressFromContainer from 'components/Pages/Account/partials/ProfilePartial/AccountOwner/BillingAddressFromContainer'
import { TextField } from 'common/forms/fields'
import ButtonSpinner from 'components/ButtonSpinner'
import AffiliateRequestPaymentSuccess from './AffiliateRequestPaymentSuccess'
import AffiliateRequestPaymentEmpty from './AffiliateRequestPaymentEmpty'


export default function AffiliateRequestPayment(props) {
  if(props.isSuccess) return <AffiliateRequestPaymentSuccess />
  if(!get(props.comission, 'data.commission_waiting')) return <AffiliateRequestPaymentEmpty {...props} />
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          <FormattedMessage id="affiliate.request.title" />
        </h4>
        <p>
          <FormattedMessage id="affiliate.request.description" />
          <a href={`${process.env.REACT_APP_HELP_BILLING_LINK}`} target="_blank"><FormattedMessage id="affiliate.request.descriptionLink" /></a>
        </p>
        <div className="card mb-3">
          <div className="card-body">
            <strong><FormattedMessage id="affiliate.request.comission" />{get(props.comission, 'data.commission_waiting', 0)} {get(props.profile, 'data.currency_code', 'SEK')}</strong>
          </div>
        </div>
        <p>
          <strong><FormattedMessage id="affiliate.request.enterInfo" /></strong>
        </p>
        <p className="small text-muted">
          <FormattedMessage id="affiliate.request.enterInfoDescription" />
        </p>
        <div className="card mb-3">
          <div className="card-body">
            <AddressForm {...props} onSubmit={props.onSubmit} isLoading={props.address.isLoading} disableButton={true} />
            <div className="custom-control custom-checkbox mt-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="isBilling"
                onChange={props.checkboxHandler}
                value={props.isBilling}
                checked={props.isBilling}
              />
              <label className="custom-control-label" htmlFor="isBilling">
                <FormattedMessage id="profile.invoiceSettings.differentBillingAddress" />
              </label>
            </div>
          </div>
        </div>
        {
          props.isBilling &&
          <div className="card mb-3">
            <div className="card-body">
              <BillingAddressFromContainer />
            </div>
          </div>
        }
        <p>
          <strong><FormattedMessage id="affiliate.request.paymentInfo" /></strong>
        </p>
        <p className="small text-muted">
          <FormattedMessage id="affiliate.request.paymentInfoDescription" />
        </p>
        <TextField name="bgnumber" label="Bankgiro number" />
        <div className="row align-items-center">
          <div className="col">
            <div className="custom-control custom-checkbox mt-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="isConfirmed"
                onChange={props.checkboxHandler}
                value={props.isConfirmed}
                checked={props.isConfirmed}
              />
              <label className="custom-control-label" htmlFor="isConfirmed">
                <FormattedMessage id="affiliate.request.confirm" />
              </label>
            </div>
          </div>
          <div className="col col-auto text-right">
            <ButtonSpinner
              className="btn btn-success"
              onClick={props.handleSubmit(props.onSubmit)}
              spin={props.request.isLoading || props.address.isLoading}
              disabled={!props.isConfirmed || props.request.isLoading || props.address.isLoading}
            >
              <FormattedMessage id="affiliate.request.title" />
            </ButtonSpinner>
          </div>
        </div>
      </div>
    </div>
  )
}
