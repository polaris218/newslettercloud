import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import ApiTokens from './ApiTokens'
import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'


class ApiTokensContainer extends Component {
  removeItem = (e) => {
    return this.props.tokens.remove(e)
      .then(_ => toast.success(<FormattedMessage id="toasters.token.deleted" />))
      .then(_ => this.props.tokens.fetch())
  }

  componentWillUnmount() {
    this.props.tokens.setData(null)
    this.props.tokens.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <ApiTokens {...this.props} removeItem={this.removeItem} />
  }
}


export default compose(
  connectResource({
    namespace: 'tokens',
    endpoint: 'tokens/:id?',
    refresh: true,
    list: true,
    item: false,
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    idKey: 'id',
  })
)(ApiTokensContainer)
