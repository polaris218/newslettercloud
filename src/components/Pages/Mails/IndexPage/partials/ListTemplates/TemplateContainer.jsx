import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import { getDomain } from 'common/utils/helpers'
import Template from './Template'
import { defaultPagination } from 'common/utils/constants'
import API from 'api'


class TemplateContainer extends Component {
  copyBlockTemplate = (data) => {
    return API(`mails/templates/block/${data.id}/copy`).post(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.template.copied" />))
      .then(res => this.props.blockTemplates.fetch())
  }

  removeBlockTemplate = (data) => {
    return this.props.block.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.template.deleted" />))
      .then(res => {
        if(this.props.blockTemplates.data.length > 1) {
          this.props.blockTemplates.fetch()
        } else {
          const prevPage = this.props.blockTemplates.filters.page > 1 ? this.props.blockTemplates.filters.page - 1 : 1
          this.props.blockTemplates.filter({ ...this.props.blockTemplates.filters, page: prevPage })
        }
      })
  }

  copyHtmlTemplate = (data) => {
    return API(`mails/templates/html/${data.id}/copy`).post(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.template.copied" />))
      .then(res => this.props.htmlTemplates.fetch())
  }

  removeHtmlTemplate = (data) => {
    return this.props.html.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.template.deleted" />))
      .then(res => {
        if(this.props.htmlTemplates.data.length > 1) {
          this.props.htmlTemplates.fetch()
        } else {
          const prevPage = this.props.htmlTemplates.filters.page > 1 ? this.props.htmlTemplates.filters.page - 1 : 1
          this.props.htmlTemplates.filter({ ...this.props.htmlTemplates.filters, page: prevPage })
        }
      })
  }

  openAsNewHtmlTemplate = (data) => {
    return API(`mails/templates/html/${data.id}`).get()
      .then(({ body, css, plain_text, subject }) => API(`mails/drafts`).post({
        body, css, plain_text, subject
      }))
      .then(({ id }) => {
        this.props.history.push(`/mails/advanced/detail/${id}`)
      })
  }

  openAsNewBlockTemplate = (data) => {
    return API(`mails/templates/block/${data.id}/draft`).post({})
      .then(res => {
        window.location.href = `http://${getDomain()}/blockeditor/mail/${res.id}/?isBeta`
      })
  }

  componentDidMount() {
    this.props.blockTemplates.filter({ paginate_by: 5, type: 'personal' })
  }

  render() {
    return (
      <Template
        {...this.props}
        copyBlockTemplate={this.copyBlockTemplate}
        removeBlockTemplate={this.removeBlockTemplate}
        removeHtmlTemplate={this.removeHtmlTemplate}
        copyHtmlTemplate={this.copyHtmlTemplate}
        openAsNewHtmlTemplate={this.openAsNewHtmlTemplate}
        openAsNewBlockTemplate={this.openAsNewBlockTemplate}
      />
    )
  }
}

export default compose(
  connectResource({
    namespace: 'blockTemplates',
    endpoint: 'mails/templates/block',
    useRouter: true,
    async: true,
    list: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'htmlTemplates',
    endpoint: 'mails/templates/html',
    filters: {
      paginate_by: 5,
    },
    async: true,
    list: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'block',
    endpoint: 'mails/templates/block/:id?',
    idKey: 'id',
    filters: {
      paginate_by: 5,
    },
    list: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'html',
    endpoint: 'mails/templates/html/:id?',
    idKey: 'id',
    filters: {
      paginate_by: 5,
    },
    list: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'profile',
    prefetch: false,
  }),
)(TemplateContainer)
