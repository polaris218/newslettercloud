import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import get from 'lodash/get'


export default function AffiliateRequestPaymentEmpty(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          <FormattedMessage id="affiliate.request.title" />
        </h4>
        <div class="alert alert-secondary" role="alert">
          <FormattedMessage id="affiliate.request.earn" />
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <strong><FormattedMessage id="affiliate.request.comission" />{get(props.comission, 'data.commission_waiting', 0)} {get(props.profile, 'data.currency_code', 'SEK')}</strong>
          </div>
        </div>
        <h5>
          <strong><FormattedMessage id="affiliate.request.tips" /></strong>
        </h5>
        <p class="small">
          <FormattedMessage id="affiliate.request.writeBlog" />
          <Link to="/account/affiliate/banners_links"><FormattedMessage id="affiliate.request.findThemHere" /></Link>.
        </p>
      </div>
    </div>
  )
}
