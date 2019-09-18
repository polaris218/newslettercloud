import React, { Component } from 'react'

import { connectResource } from 'common/utils/resource'
import Invoices from './Invoices'


class InvoicesContainer extends Component {
  componentWillUnmount() {
    this.props.invoices.setData(null)
  }

  render() {
    return <Invoices {...this.props} />
  }
}

export default connectResource({
  namespace: 'invoices',
  endpoint: 'invoices',
  useRouter: true,
  filters: {
    paginate_by: 12,
  },
  list: true,
  async: true,
})(InvoicesContainer)
