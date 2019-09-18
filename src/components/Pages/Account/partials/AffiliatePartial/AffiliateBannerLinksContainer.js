import React, { Component } from 'react'
import { compose } from 'redux'

import AffiliateBannerLinks from './AffiliateBannerLinks'
import { connectResource } from 'common/utils/resource'


class AffiliateBannerLinksContainer extends Component {
  componentWillUnmount() {
    this.props.affiliate.setData(null)
  }

  render() {
    return <AffiliateBannerLinks {...this.props} />
  }
}

export default compose(
  connectResource({
    namespace: 'affiliate',
    endpoint: 'affiliate',
    list: true,
    async: true,
  }),
)(AffiliateBannerLinksContainer)

