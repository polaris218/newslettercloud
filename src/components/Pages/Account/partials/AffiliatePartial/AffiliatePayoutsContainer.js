import React, { Component } from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'
import AffiliatePayouts from './AffiliatePayouts'


class AffiliatePayoutsContainer extends Component {
  componentWillUnmount() {
    this.props.payouts.setData(null)
    this.props.payouts.setFilters({ paginate_by: defaultPagination, page: 1, type: 4 })
  }

  render() {
    return <AffiliatePayouts {...this.props} />
  }
}

export default compose(
  connectResource({
    namespace: 'payouts',
    endpoint: 'invoices',
    filters: {
      paginate_by: defaultPagination,
      type: 4,
    },
    list: true,
    async: true,
  })
)(AffiliatePayoutsContainer)
