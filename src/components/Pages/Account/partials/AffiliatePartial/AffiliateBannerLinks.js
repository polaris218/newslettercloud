import React from 'react'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl';

import AffiliateBannerCard from './AffiliateBannerCard'
import Spinner from 'components/Spinner'


const banners = [
  { width: 234, height: 60 },
  { width: 468, height: 60 },
  { width: 728, height: 90 },
  { width: 300, height: 250 }
]

export default function AffiliateBannerLinks({ affiliate }) {
  return (
    <div className="card">
      <div className="card-body">
        <Spinner show={affiliate.isLoading} />
        <h4 className="card-title">
          <FormattedMessage id="affiliate.bannerAndLinks.title" />
        </h4>
        <p>
          <FormattedMessage id="affiliate.bannerAndLinks.description" />
        </p>
        <h5 className="mb-3"><FormattedMessage id="affiliate.bannerAndLinks.textLink" /></h5>
        <input type="text" className="form-control" disabled value={`${process.env.REACT_APP_MAIN_LINK}/?a_aid=${get(affiliate, 'data.affiliate_id')}`} />
        <h5 className="my-3"><FormattedMessage id="affiliate.bannerAndLinks.imageBanners" /></h5>
        <p className="small text-muted">
          <FormattedMessage id="affiliate.bannerAndLinks.imageBannersDescription" />
        </p>
        {
          get(affiliate, 'data.affiliate_id') && banners.map(i =>
            <AffiliateBannerCard {...i} id={get(affiliate, 'data.affiliate_id')} />
          )
        }
      </div>
    </div>
  )
}
