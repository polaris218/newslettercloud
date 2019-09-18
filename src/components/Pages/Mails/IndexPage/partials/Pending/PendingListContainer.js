import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import PendingList from './PendingList'
import { defaultPagination } from 'common/utils/constants'


class PendingListContainer extends Component {
  removePending = (data) => {
    return this.props.pendingList.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.pending.deleted" />))
  }

  componentWillUnmount() {
    this.props.pendingList.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <PendingList {...this.props} removePending={this.removePending} />
  }
}

export default compose(
  connectResource({
    namespace: 'pendingList',
    endpoint: 'mails/pending_review/:id?',
    idKey: 'id',
    prefetch: false,
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
  }),
)(PendingListContainer)
