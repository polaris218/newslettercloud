import React, { Component } from 'react'

import BouncesPartial from './BouncesPartial'
import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'


class BouncesPartialContainer extends Component {
  componentWillUnmount() {
    this.props.bounces.setData(null)
  }

  render() {
    return <BouncesPartial {...this.props} />
  }
}

export default connectResource({
  namespace: 'bounces',
  endpoint: 'reports/:id/bounces',
  list: true,
  async: true,
  filters: {
    paginate_by: defaultPagination,
    ordering: '-opens,-clicks,contact__email',
  }
})(BouncesPartialContainer)
