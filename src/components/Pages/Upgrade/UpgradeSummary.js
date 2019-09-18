import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import PaymentModal from 'modals/components/PaymentModal'
import { getPaymentUrl } from 'common/utils/helpers'


export default function UpgradeSummary({ isCard, selectMethod, articleData, address, billing, onSubmit, showPaymentModal,
  upgradeAccount, onClose, profile, user, editYourInformation, discount, checkvat }) {
  if(!articleData.data) return <Redirect to="/upgrade" />
  const isYear = articleData.data.months === 12
  const articleSum = (isYear ? articleData.data.price * 12 : articleData.data.price)
  const discountMonth = articleData.data.start === 0 ? get(discount, 'data.order_price', 0) : 0
  const discountSum = isYear ? discountMonth * 12 : discountMonth
  const articleSumWithDiscount = articleSum - discountSum
  const articleVat = get(checkvat, 'data.pays_vat') ? articleSumWithDiscount * 0.25 : 0
  const separateBillingAddress = profile.data.different_billing_address;

  return (
    <>
      {
        showPaymentModal &&
        <PaymentModal
          onClose={onClose}
          filters={{
            order_id: get(upgradeAccount, 'data.order_id'),
            accepturl: getPaymentUrl(`upgrade/pay-by-card/accept/`),
          }}
          id={get(upgradeAccount, 'data.invoice_id')}
        />
      }
      <div className="row mb-3">
        <div className="col-8 offset-2">
          <h1><FormattedMessage id="common.summary" /></h1>
          <p><FormattedMessage id="upgrade.reviewYourInformation" /></p>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-8 offset-2">
          <div className="card mb-5">
            <h3 className="card-header h5"><FormattedMessage id="common.yourInformation" /></h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row mb-3">
                  <div className="col">
                    <span className="d-block small text-muted"><FormattedMessage id="common.address" /></span>
                    <span className="d-block">{address.data.address_1}</span>
                    {
                      address.data.address_2 &&
                      <>
                      <span className="d-block">{address.data.address_2}</span>
                      </>
                    }
                    <span>{address.data.zip_code} {address.data.city} </span>
                  </div>
                  <div className="col">
                    <span className="d-block small text-muted"><FormattedMessage id="common.company" /></span>
                    <span>{address.data.company || '-'}</span>
                    <br />
                    <span><FormattedMessage id="upgrade.orgNr" /> {address.data.org_number || address.data.vat_id}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <span className="d-block small text-muted"><FormattedMessage id="common.email" /></span>
                    <span className="d-block">{user.data.email}</span>
                  </div>
                  {
                    (address.data.email || address.data.extra_email) &&
                    <div className="col">
                      <span className="d-block small text-muted"><FormattedMessage id="common.inputs.extraEmail" /></span>
                      {
                        address.data.email &&
                        <span className="d-block">{address.data.email}</span>
                      }
                      {
                        address.data.extra_email &&
                        <span className="d-block">{address.data.extra_email}</span>
                      }
                    </div>
                  }
                </div>
                {
                  address.data.reference &&
                  <div className="row">
                    <div className="col">
                      <span className="d-block small text-muted"><FormattedMessage id="common.reference" /></span>
                      <span>{address.data.reference}</span>
                    </div>
                  </div>
                }
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    <span className="d-block small text-muted"><FormattedMessage id="upgrade.separateBillingAddress" /></span>
                    <span>{profile.data.different_billing_address ? <FormattedMessage id="common.yes" /> : <FormattedMessage id="common.no" />}</span>
                  </div>
                  <div className="col">
                  </div>
                </div>
              </li>
              {
                separateBillingAddress &&
                <li className="list-group-item">
                  <div className="row mb-3">
                    <div className="col">
                      <span className="d-block small text-muted"><FormattedMessage id="common.address" /></span>
                      <span className="d-block">{billing.data.address_1}</span>
                      {
                        billing.data.address_2 &&
                        <>
                        <span className="d-block">{billing.data.address_2}</span>
                        </>
                      }
                      <span>{billing.data.zip_code} {billing.data.city} </span>
                    </div>
                    <div className="col">
                      <span className="d-block small text-muted"><FormattedMessage id="common.company" /></span>
                      <span>{billing.data.company || '-'}</span>
                      <br />
                      <span><FormattedMessage id="upgrade.orgNr" /> {billing.data.org_number || billing.data.vat_id}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <span className="d-block small text-muted"><FormattedMessage id="common.email" /></span>
                      <span className="d-block">{user.data.email}</span>
                    </div>
                    {
                      (billing.data.email || billing.data.extra_email) &&
                      <div className="col">
                        <span className="d-block small text-muted"><FormattedMessage id="common.inputs.extraEmail" /></span>
                        {
                          billing.data.email &&
                          <span className="d-block">{billing.data.email}</span>
                        }
                        {
                          billing.data.extra_email &&
                          <span className="d-block">{billing.data.extra_email}</span>
                        }
                      </div>
                    }
                  </div>
                  {
                    billing.data.reference &&
                    <div className="row">
                      <div className="col">
                        <span className="d-block small text-muted"><FormattedMessage id="common.reference" /></span>
                        <span>{billing.data.reference}</span>
                      </div>
                    </div>
                  }
                </li>
              }
            </ul>
            <div className="card-body">
              <Link to="/upgrade/information" className="btn btn-sm btn-light"><FormattedMessage id="common.editYourInformation" /></Link>
            </div>
          </div>

          {
          articleData.data.months === 12 &&
          <div className="mb-5">
            <div className="card bg-light">
              <h3 className="card-header h5"><FormattedMessage id="common.choosePayment" /></h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="custom-control custom-radio">
                    <input type="radio" id="card" value={isCard} checked={isCard} onChange={selectMethod} className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="card">
                      <h5><FormattedMessage id="upgrade.payByCard" /></h5>
                      <p className="card-text small text-muted"><FormattedMessage id="upgrade.getInstantAccess" /></p>
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="custom-control custom-radio">
                    <input type="radio" id="invoice" value={!isCard} checked={!isCard} onChange={selectMethod} className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="invoice">
                      <h5><FormattedMessage id="upgrade.payByInvoice" /></h5>
                      <p className="card-text small text-muted"><FormattedMessage id="upgrade.getAccessToYourUpgradedAccount" /></p>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        }

          <div className="card mb-4">
            <h3 className="card-header h5"><FormattedMessage id="common.yourOrder" /></h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    <span className="d-block text-muted"><FormattedMessage id="common.description" /></span>
                    <span className="d-block font-weight-bold">{articleData.data.name || '-'}</span>
                  </div>
                  <div className="col">
                    <span className="d-block text-muted"><FormattedMessage id="common.period" /></span>
                    <span className="d-block font-weight-bold">1 {isYear ? 'year' : 'month'}</span>
                  </div>
                  <div className="col">
                    <span className="d-block text-muted"><FormattedMessage id="common.price" /></span>
                    <span className="d-block font-weight-bold">
                      {articleData.data.price}{` `} {profile.data.currency_code}/<FormattedMessage id="common.month" />
                      </span>
                  </div>
                </div>
              </li>
              {
                !!discountSum &&
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      <span className="d-block text-muted">
                        <FormattedMessage id="upgrade.discount" />
                      </span>
                      <span className="d-block font-weight-bold">
                        -{discountMonth} {profile.data.currency_code}
                      </span>
                    </div>
                    <div className="col">
                      <span className="d-block text-muted">
                        <FormattedMessage id="common.period" />
                      </span>
                      <span className="d-block font-weight-bold">1 {isYear ? 'year' : 'month'}</span>
                    </div>
                    <div className="col">
                      <span className="d-block text-muted"><FormattedMessage id="upgrade.totalDiscount" /></span>
                      <span className="d-block font-weight-bold">-{discountSum} {profile.data.currency_code}</span>
                    </div>
                  </div>
                </li>
              }
              <li className="list-group-item bg-light">
                <div className="row">
                  <div className="col">
                    <span className="d-block text-muted"><FormattedMessage id="common.sum" /></span>
                    <span className="d-block font-weight-bold">{articleSumWithDiscount} {profile.data.currency_code}</span>
                  </div>
                  <div className="col">
                    {
                      !!articleVat &&
                      <>
                        <span className="d-block text-muted"><FormattedMessage id="common.vat" values={{percent: '25%'}}/></span>
                        <span className="d-block font-weight-bold">{articleVat} {profile.data.currency_code}</span>
                      </>
                    }
                  </div>
                  <div className="col">
                    <span className="d-block text-muted"><FormattedMessage id="common.total" /></span>
                    <span className="h1 d-block font-weight-bold mb-0">{articleSumWithDiscount + articleVat} {profile.data.currency_code}</span>
                  </div>
                </div>
              </li>
            </ul>
            <div className="card-body">
              <p className="small text-muted mb-3"><FormattedMessage id="common.byPlacing" /> <a href="#"><FormattedMessage id="common.termsOfUse" /></a> <FormattedMessage id="common.myCardWillBeCharged" /></p>
              <button className="btn btn-lg btn-success btn-block" onClick={onSubmit}><FormattedMessage id="common.upgradeNow" /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
