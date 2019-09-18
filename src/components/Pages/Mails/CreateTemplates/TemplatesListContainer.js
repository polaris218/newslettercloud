import React, { Component } from 'react'
import { compose } from 'redux'

import TemplatesList from './TemplatesList'
import { connectResource } from 'common/utils/resource'
import API from 'api'
import { getDomain } from 'common/utils/helpers'


class TemplatesListContainer extends Component {
  componentDidMount() {
    this.props.newDrafts.filter(this.props.filters)
    if(this.props.view === 'public') {
      this.props.newDesigned.filter({ ...this.props.filters, designed: true })
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.view !== this.props.view) {
      this.props.newDrafts.filter(this.props.filters)
    }
  }

  createBlockTemplate = (id) => {
    return API(`mails/templates/block/${id}/copy`).post({})
      .then(res => {
        window.location.href = `http://${getDomain()}/blockeditor/template/${res.id}/`
      })
  }

  render() {
    return <TemplatesList {...this.props} createBlockTemplate={this.createBlockTemplate} />
  }
}

export default compose(
  connectResource({
    namespace: 'newDrafts',
    endpoint: 'mails/templates/block',
    list: true,
    item: false,
    async: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'newDesigned',
    endpoint: 'mails/templates/block',
    list: true,
    item: false,
    async: true,
    prefetch: false,
  }),
)(TemplatesListContainer)
