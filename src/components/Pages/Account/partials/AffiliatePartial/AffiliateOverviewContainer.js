import React, { Component } from 'react'
import { compose } from 'redux'

import AffiliateOverview from './AffiliateOverview'
import { connectResource } from 'common/utils/resource'


class AffiliateOverviewContainer extends Component { 
  componentWillUnmount() {
    this.props.comission.setData(null)
    this.props.transactions.setData(null)
  }

  render() {
    return <AffiliateOverview {...this.props} />
  }
}

export default compose(
  connectResource({
    namespace: 'comission',
    endpoint: 'affiliate/commission',
    list: true,
    async: true,
  }),
  connectResource({
    namespace: 'transactions',
    endpoint: 'affiliate/transactions',
    list: true,
    async: true,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    async: true,
    prefetch: false,
  }),
)(AffiliateOverviewContainer)

