import React, { Component } from 'react'

import PopularLinks from './PopularLinks'
import { connectResource } from 'common/utils/resource'


class PopularLinksContainer extends Component {
  componentWillUnmount() {
    this.props.popularLinks.setData(null)
  }

  render() {
    return <PopularLinks {...this.props} />
  }
}

export default connectResource({
  namespace: 'popularLinks',
  endpoint: 'reports/:id/links',
  async: true,
  list: true,
  filters: {
    paginate_by: 5,
    ordering: '-unique_clicks',
  },
})(PopularLinksContainer)
