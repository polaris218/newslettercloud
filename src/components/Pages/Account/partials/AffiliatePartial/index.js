import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';

import AffiliateOverviewContainer from './AffiliateOverviewContainer'
import AffiliateGetStarted from './AffiliateGetStarted'
import AffiliateBannerLinksContainer from './AffiliateBannerLinksContainer'
import AffiliateTransactionsContainer from './AffiliateTransactionsContainer'
import AffiliatePayoutsContainer from './AffiliatePayoutsContainer'
import AffiliateRequestPaymentContainer from './AffiliateRequestPaymentContainer'


export default function AffiliatePartial(props) {
  return (
    <div className="row mb-3">
      <div className="col-3">
        <ul className="list-group">
          <NavLink exact to="/account/affiliate" className="list-group-item list-group-item-action"><FormattedMessage id="affiliate.links.overview" /></NavLink>
          <NavLink exact to="/account/affiliate/get-started" className="list-group-item list-group-item-action"><FormattedMessage id="affiliate.links.getStarted" /></NavLink>
          <NavLink exact to="/account/affiliate/banner-links" className="list-group-item list-group-item-action"><FormattedMessage id="affiliate.links.bannersLinks" /></NavLink>
          <NavLink exact to="/account/affiliate/transactions" className="list-group-item list-group-item-action"><FormattedMessage id="affiliate.links.transactions" /></NavLink>
          <NavLink to="/account/affiliate/request-payment" className="list-group-item list-group-item-action"><FormattedMessage id="affiliate.links.requestPayment" /></NavLink>
          <NavLink to="/account/affiliate/payouts" className="list-group-item list-group-item-action"><FormattedMessage id="affiliate.links.payouts" /></NavLink>
        </ul>
      </div>
      <div className="col-9">
        <Route exact path="/account/affiliate" component={AffiliateOverviewContainer} />
        <Route exact path="/account/affiliate/get-started" component={AffiliateGetStarted} />
        <Route exact path="/account/affiliate/banner-links" component={AffiliateBannerLinksContainer} />
        <Route exact path="/account/affiliate/transactions" component={AffiliateTransactionsContainer} />
        <Route exact path="/account/affiliate/payouts" component={AffiliatePayoutsContainer} />
        <Route exact path="/account/affiliate/request-payment" component={AffiliateRequestPaymentContainer} />
        {/* <h2>Request payment</h2>
        <p>You need to earn over 500 SEK in commission in order to request a payment.</p>
        <div className="card mb-3">
          <div className="card-body">
            <span className="font-weight-bold">Earned commission: 8 SEK</span>
          </div>
        </div>
        <h4>Tips to reach your target</h4>
        <p className="small">
          Write a blog post about Get a Newsletter, share us on Facebook/Twitter or put an ad on your site. Remember
          to use a link or banner image that contains your affiliate ID, you can find them here.
        </p>

        <hr />

        <h2>Payouts</h2>
        <p>
          This is a list of all your payouts. You can download the invoice and specification for each payout and see
          the current status. As soon as we make a payout the status will change from Not paid to Paid.
        </p>

        <div className="table-responsive">
          <table className="table table-hover table-bordered table-sm">
            <thead className="thead-light">
              <tr>
                <th className="text-capitalize">Invoice number</th>
                <th className="text-capitalize">Payout date</th>
                <th className="text-capitalize">Download</th>
                <th className="text-capitalize">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12345</td>
                <td>2018-11-25</td>
                <td>Download</td>
                <td>In progress</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}
