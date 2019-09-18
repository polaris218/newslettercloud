import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import DraftList from './DraftList'
import { defaultPagination } from 'common/utils/constants'


class DraftListContainer extends Component {
  copyDraft = (data) => {
    return this.props.cloneDraft.create(data, { endpoint: `mails/all/${data.id}/clone` })
      .then(_ => toast.success(<FormattedMessage id="toasters.draft.copied" />))
      .then(res => this.props.drafts.fetch())
  }

  removeDraft = (data) => {
    return this.props.drafts.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.draft.deleted" />))
  }

  componentWillUnmount() {
    this.props.drafts.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <DraftList {...this.props} copyDraft={this.copyDraft} removeDraft={this.removeDraft} />
  }
}

export default compose(
  connectResource({
    namespace: 'drafts',
    endpoint: 'mails/drafts/:id?',
    idKey: 'id',
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    list: true,
    refresh: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'cloneDraft',
    endpoint: 'mails/all/:id?/clone',
    idKey: 'id',
    prefetch: false,
    async: true,
    list: true,
  }),
)(DraftListContainer)
