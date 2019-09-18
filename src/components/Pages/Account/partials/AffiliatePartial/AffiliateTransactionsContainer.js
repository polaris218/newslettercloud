import React, { Component } from 'react'
import { compose } from 'redux'

import AffiliateTransactions from './AffiliateTransactions'
import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'


class AffiliateBannerLinksContainer extends Component {
  componentWillUnmount() {
    this.props.comission.setData(null)
    this.props.transactions.setData(null)
    this.props.transactionsList.setData(null)
    this.props.transactionsList.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <AffiliateTransactions {...this.props} />
  }
}

export default compose(
  connectResource({
    namespace: 'transactionsList',
    endpoint: 'affiliate/transactions/list',
    list: true,
    async: true,
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    }
  }),
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
)(AffiliateBannerLinksContainer)

