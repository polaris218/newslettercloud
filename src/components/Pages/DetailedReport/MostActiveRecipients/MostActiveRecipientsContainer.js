import React, { Component } from 'react'

import MostActiveRecipients from './MostActiveRecipients'
import { connectResource } from 'common/utils/resource'


class MostActiveRecipientsContainer extends Component {
  componentWillUnmount() {
    this.props.mostActive.setData(null)
  }

  render() {
    return <MostActiveRecipients {...this.props} />
  }
}

export default connectResource({
  namespace: 'mostActive',
  endpoint: 'reports/:id/most_active_customers',
  async: true,
  list: true,
  filters: {
    paginate_by: 5,
    ordering: '-opens,-clicks',
  },
})(MostActiveRecipientsContainer)
