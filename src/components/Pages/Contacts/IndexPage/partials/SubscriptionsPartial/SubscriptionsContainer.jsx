import React, { Component } from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import Subscriptions from './Subscriptions'
import SearchCheckedHoc from '../components/SearchCheckedHoc'
import { defaultPagination } from 'common/utils/constants'


class SubscriptionsContainer extends Component {
  componentDidMount() {
    this.props.subscriptions.filter({ ...this.props.subscriptions.filters, ...this.props.location.state})
  }

  componentWillUnmount() {
    this.props.subscriptions.setData(null)
    this.props.subscriptions.setFilters({ paginate_by: defaultPagination, page: 1, lists: null, search: null })
  }

  render() {
    const { subscriptionsInfo: { count }, ...restProps } = this.props

    return <Subscriptions
      countOfSubscriptions = {count}
      {...restProps}
    />
  }
}

export default compose(

  connectResource({
    namespace: 'subscriptionsInfo',
    endpoint: 'subscriptions',
    async: true,
    filters: {
      paginate_by: 1,
    },
    list: true,
  }),
  connectResource({
    namespace: 'subscriptions',
    endpoint: 'subscriptions',
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
    useRouter: true,
    prefetch: false,
  }),
  SearchCheckedHoc,
)(SubscriptionsContainer)
