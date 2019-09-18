import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import AutorespondersList from './AutorespondersList'
import API from 'api'
import { defaultPagination } from 'common/utils/constants'

class AutorespondersListContainer extends Component {
  pauseResponder = (id) => {
    return API(`responders/${id}/pause`).post()
      .then(_ => toast.success(<FormattedMessage id="toasters.autoresponder.paused" />))
      .then(_ => this.props.autorespondersList.fetch())
  }

  resumeResponder = (id) => {
    return API(`responders/${id}/resume`).post()
      .then(_ => toast.success(<FormattedMessage id="toasters.autoresponder.resumed" />))
      .then(_ => this.props.autorespondersList.fetch())
  }

  copyDraft = (data) => {
    return API(`mails/all/${data.mail.id}/clone`).post()
      .then(_ => toast.success(<FormattedMessage id="toasters.autoresponder.copied" />))
      .then(res => this.props.history.push('/mails/drafts'))
  }

  removeResponder = (data) => {
    return this.props.autorespondersList.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.autoresponder.deleted" />))
  }

  removeReport = (id) => {
    if(!id) return
    return API(`reports/${id}`).delete()
  }

  componentWillUnmount() {
    this.props.autorespondersList.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <AutorespondersList
      {...this.props}
      pauseResponder={this.pauseResponder}
      resumeResponder={this.resumeResponder}
      copyDraft={this.copyDraft}
      removeResponder={this.removeResponder}
      removeReport={this.removeReport}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'autorespondersList',
    endpoint: 'responders/:id?',
    idKey: 'id',
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    prefetch: false,
    list: true,
    async: true,
  }),
)(AutorespondersListContainer)
