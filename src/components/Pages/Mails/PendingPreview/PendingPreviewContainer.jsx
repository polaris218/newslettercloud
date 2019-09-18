import React from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import PendingPreview from './PendingPreview'
import API from 'api'


class PendingPreviewContainer extends React.Component {

  removeDraft = (draft) => {
    return API(`mails/pending_review/${draft.id}/abort`).post()
      .then(_ => toast.success(<FormattedMessage id="toasters.mail.deleted" />))
      .then(_ => this.props.pendingReview.fetch())
  }

  render() {
    return <PendingPreview
     {...this.props}
     removeDraft={this.removeDraft}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'pendingReview',
    endpoint: 'mails/pending_review',
    refresh: true,
    async: true,
    list: true,
    filters: {
      paginate_by: 100,
    }
  }),
)(PendingPreviewContainer)
