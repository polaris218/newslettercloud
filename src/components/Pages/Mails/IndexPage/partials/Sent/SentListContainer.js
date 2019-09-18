import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import SentList from './SentList'
import API from 'api'
import { defaultPagination } from 'common/utils/constants'


class SentListContainer extends Component {
  copyDraft = (data) => {
    return API(`mails/all/${data.mail}/clone`).post(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.sent.copied" />))
      .then(res => this.props.history.push('/mails/drafts'))
  }

  removeReport = (id) => {
    if(!id) return
    return API(`reports/${id}`).delete()
  }

  removeSent = (data) => {
    return this.props.sentList.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.sent.deleted" />))
  }

  componentWillUnmount() {
    this.props.sentList.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <SentList {...this.props} copyDraft={this.copyDraft} removeReport={this.removeReport} removeSent={this.removeSent} />
  }
}

export default compose(
  connectResource({
    namespace: 'sentList',
    endpoint: 'mails/sent/:id?',
    idKey: 'id',
    prefetch: false,
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
  }),
)(SentListContainer)
