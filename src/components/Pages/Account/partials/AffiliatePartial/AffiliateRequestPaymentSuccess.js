import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'


export default function AffiliateRequestPaymentSuccess(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          <FormattedMessage id="affiliate.request.title" />
        </h4>
        <p>
          <FormattedMessage id="affiliate.request.recommend" />
        </p>
        <h3 className="card-title">
          <FormattedMessage id="affiliate.request.thanks" />
        </h3>
        <p>
          <FormattedMessage id="affiliate.request.telling" />
          <Link to="/account/affiliate/payouts"><FormattedMessage id="affiliate.request.payouts" /></Link>
        </p>
        <p className="small"><FormattedMessage id="affiliate.request.also" /></p>
        <Link to="/account/affiliate/payouts" className="btn btn-success"><FormattedMessage id="affiliate.request.seeStatus" /></Link>
      </div>
    </div>
  )
}
