import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import SendersPartial from './SendersPartial'
import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'


class SendersPartialContainer extends Component {
  removeSender = (data) => {
    return this.props.senders.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.sender.deleted" />))
  }

  componentWillUnmount() {
    this.props.senders.setData(null)
    this.props.senders.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <SendersPartial {...this.props} removeSender={this.removeSender} />
  }
}

export default compose(
  connectResource({
    namespace: 'senders',
    endpoint: 'senders/:id?',
    refresh: true,
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    item: false,
    async: true,
    idKey: 'id',
  })
)(SendersPartialContainer)
