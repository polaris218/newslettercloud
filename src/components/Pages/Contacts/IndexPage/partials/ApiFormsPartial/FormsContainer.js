import React, { Component } from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'
import Forms from './Forms'


class FormsContainer extends Component {
  componentWillUnmount() {
    this.props.forms.setData(null)
    this.props.forms.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <Forms
      {...this.props}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'forms',
    endpoint: 'subscription_forms',
    idKey: 'key',
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
    useRouter: true,
    refresh: true,
  }),
)(FormsContainer)
