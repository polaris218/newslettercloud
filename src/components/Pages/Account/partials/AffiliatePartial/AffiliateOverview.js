import React from 'react'
import get from 'lodash/get'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

import Spinner from 'components/Spinner'


const AffiliateEmptyComission = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title"><FormattedMessage id="affiliate.overview.title" /></h4>
        <p>
          <FormattedMessage id="affiliate.overview.emptyComissionMainText" />
        </p>
        <small className="card-text">
          <FormattedMessage id="affiliate.overview.emptyComissionSmall" />
        </small>
        <div className="pt-4">
          <Link to="/account/affiliate/get-started" className="btn btn-success">
            <FormattedMessage id="affiliate.overview.getStarted" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AffiliateOverview({ comission, transactions, profile: { data } }) {
  if(!comission.data || !comission.data.commission_total) return <AffiliateEmptyComission />
  const profileData = data || {}
  return (
    <div className="card">
      <div className="card-body">
        <Spinner show={comission.isLoading || transactions.isLoading} />
        <h4 className="card-title">
          <FormattedMessage id="affiliate.overview.title" />
        </h4>
        <p>
          <FormattedMessage id="affiliate.overview.haveEarned" values={{ total: get(comission, 'data.commission_total'), currency: profileData.currency_code }} />
        </p>
        <div className="row mb-5">
          <div className="col">
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">
                    <FormattedMessage id="affiliate.overview.moneyEarned" />
                  </h4>
                  <div className="row mb-1 justify-content-between">
                    <div className="col col-auto">
                      <span>
                        <FormattedMessage id="affiliate.overview.commissionWaiting" />
                      </span>
                    </div>
                    <div className="col col-auto">
                      <span className="font-weight-bold float-right">{get(comission, 'data.commission_waiting')} {profileData.currency_code}</span>
                    </div>
                  </div>
                  <div className="row mb-1 justify-content-between">
                    <div className="col col-auto">
                      <span><FormattedMessage id="affiliate.overview.commissionPaid" /></span>
                    </div>
                    <div className="col col-auto">
                      <span className="font-weight-bold float-right">{get(comission, 'data.commission_paid')} {profileData.currency_code}</span>
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-between">
                    <div className="col col-auto">
                      <span><FormattedMessage id="affiliate.overview.commissionTotal" /></span>
                    </div>
                    <div className="col col-auto">
                      <span className="font-weight-bold float-right">{get(comission, 'data.commission_total')} {profileData.currency_code}</span>
                    </div>
                  </div>
                  <Link to="/account/affiliate/request-payment" className="btn btn-success"><FormattedMessage id="affiliate.overview.requestPayment" /></Link>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title"><FormattedMessage id="affiliate.overview.typeOfAccounts" /></h4>
                  <div className="row mb-1 justify-content-between">
                    <div className="col col-auto">
                      <span><FormattedMessage id="affiliate.overview.freeAccount" /></span>
                    </div>
                    <div className="col col-auto">
                      <span className="font-weight-bold float-right">{get(transactions, 'data.free_count')}</span>
                    </div>
                  </div>
                  <div className="row mb-1 justify-content-between">
                    <div className="col col-auto">
                      <span><FormattedMessage id="affiliate.overview.paidAccount" /></span>
                    </div>
                    <div className="col col-auto">
                      <span className="font-weight-bold float-right">{get(transactions, 'data.paid_count')}</span>
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-between">
                    <div className="col">
                      <span>&nbsp;</span>
                    </div>
                  </div>
                  <Link to="/account/affiliate/transactions" className="btn btn-outline-secondary"><FormattedMessage id="affiliate.overview.viewTransactions" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
