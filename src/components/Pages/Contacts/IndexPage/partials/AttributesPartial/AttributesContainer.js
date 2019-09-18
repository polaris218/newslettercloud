import React, { Component } from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'
import Attributes from './Attributes'


class AttributesContainer extends Component {
  componentWillUnmount() {
    this.props.attributes.setData(null)
    this.props.attributes.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <Attributes
      {...this.props}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'attributes',
    endpoint: 'attributes',
    idKey: 'code',
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
    useRouter: true,
  }),
)(AttributesContainer)
