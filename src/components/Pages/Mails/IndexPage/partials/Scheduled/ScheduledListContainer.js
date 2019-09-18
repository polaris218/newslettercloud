import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import ScheduledList from './ScheduledList'
import API from 'api'
import { defaultPagination } from 'common/utils/constants'


class ScheduledListContainer extends Component {
  copyDraft = (data) => {
    return API(`mails/all/${data.mail}/clone`).post(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.scheduled.copied" />))
      .then(res => this.props.history.push('/mails/drafts'))
  }

  stopScheduled = (data) => {
    return this.props.scheduledList.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.scheduled.stopped" />))
      .then(res => this.props.history.push('/mails/drafts'))
  }

  componentWillUnmount() {
    this.props.scheduledList.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <ScheduledList {...this.props} copyDraft={this.copyDraft} stopScheduled={this.stopScheduled} />
  }
}

export default compose(
  connectResource({
    namespace: 'scheduledList',
    endpoint: 'mails/scheduled/:id?',
    idKey: 'id',
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
    prefetch: false,
  }),
)(ScheduledListContainer)
