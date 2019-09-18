import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import StoppedList from './StoppedList'
import API from 'api'
import { defaultPagination } from 'common/utils/constants'


class StoppedListContainer extends Component {
  sendNow = (id) => {
    return API(`mails/stopped/${id}/replan`).post({ time_to_send: null })
      .then(_ => toast.success(<FormattedMessage id="toasters.sending.inprocess" />))
      .then(_ => this.props.stoppedList.fetch())
  }

  setDraft = (data) => {
    return this.props.stoppedList.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.mail.setAsDraft" />))
      .then(res => this.props.history.push('/mails/drafts'))
  }

  componentWillUnmount() {
    this.props.stoppedList.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <StoppedList {...this.props} sendNow={this.sendNow} setDraft={this.setDraft} />
  }
}

export default compose(
  connectResource({
    namespace: 'stoppedList',
    endpoint: 'mails/stopped/:id?',
    idKey: 'id',
    prefetch: false,
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
  }),
)(StoppedListContainer)
