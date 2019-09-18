import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import Partners from './Partners'
import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'


class PartnersContainer extends Component {
  componentWillUnmount() {
    this.props.partners.setData(null)
    this.props.partners.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  removePartner = (data) => {
    return this.props.partners.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.partner.removed" />))
  }

  render() {
    return <Partners {...this.props} removePartner={this.removePartner} />
  }
}

export default connectResource({
  namespace: 'partners',
  endpoint: 'profile/partners/:id?',
  idKey: 'id',
  list: true,
  filters: {
    paginate_by: defaultPagination,
  },
  async: true,
})(PartnersContainer)
