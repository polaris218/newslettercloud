import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { connectResource } from 'common/utils/resource'


function AffiliateGetStarted({ profile }) {
  const profileData = get(profile, 'data') || {}
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          <FormattedMessage id="affiliate.getStarted.title" />
        </h4>
        <p>
        <FormattedMessage id="affiliate.getStarted.description" />
        </p>
        <h5 className="mb-3"><FormattedMessage id="affiliate.getStarted.thisIsWhatYouEarn" /></h5>
        <div className="row mb-3">
          <div className="col">
            <div className="card-deck">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center mb-1 justify-content-between">
                    <div className="col">
                      <span><FormattedMessage id="affiliate.getStarted.signupForFree" /></span>
                    </div>
                    <div className="col text-right">
                      <span className="font-weight-bold h1">1 <small>{profileData.currency_code}</small></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center mb-1 justify-content-between">
                    <div className="col">
                      <span><FormattedMessage id="affiliate.getStarted.upgradeToPaidAccount" /></span>
                    </div>
                    <div className="col text-right">
                      <span className="font-weight-bold h1">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="small text-muted mt-3">
              * <FormattedMessage id="affiliate.getStarted.upgradeToPaidAccountDescription" />
            </p>
            <h5><FormattedMessage id="affiliate.getStarted.howToGetStarted" /></h5>
            <p>
              <FormattedMessage id="affiliate.getStarted.howToGetStartedDescription" />
              <Link to="/account/affiliate/banner-links">
                <FormattedMessage id="affiliate.getStarted.howToGetStartedDescriptionLink" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connectResource({
  namespace: 'profile',
  endpoint: 'profile',
  async: true,
  prefetch: false,
})(AffiliateGetStarted)
