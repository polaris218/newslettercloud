import React, { Component } from 'react'
import { compose } from 'redux'

import DraftList from './DraftList'
import { connectResource } from 'common/utils/resource'
import { getDomain } from 'common/utils/helpers'
import API from 'api'


class DraftListContainer extends Component {
  state = {
    showAdvanced: false,
  }

  componentDidMount() {
    this.props.newDrafts.filter(this.props.filters)
    if(this.props.view === 'public') {
      this.props.newDesigned.filter({ ...this.props.filters, designed: true })
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.view !== this.props.view) {
      if(this.props.view !== 'advanced') {
        return this.props.newDrafts.filter(this.props.filters)
      }
      return this.props.advancedDrafts.fetch()
    }
  }

  createBlockDraft = (id) => {
    return API(`mails/templates/block/${id}/draft`).post({})
      .then(res => {
        window.location.href = `http://${getDomain()}/blockeditor/mail/${res.id}/?isBeta`
      })
  }

  createAdvancedDraft = (id) => {
    return API(`mails/templates/html/${id}`).get()
      .then(res => API(`mails/drafts`).post({
        body: res.body,
        css: res.css,
        plain_text: res.plain_text,
        subject: res.subject,
      }))
      .then(res => this.props.history.push(`/mails/advanced/detail/${res.id}`))
  }

  showAdvancedTrigger = () => {
    this.setState({ showAdvanced: !this.state.showAdvanced })
  }

  render() {
    return <DraftList
      {...this.state}
      {...this.props}
      createBlockDraft={this.createBlockDraft}
      createAdvancedDraft={this.createAdvancedDraft}
      showAdvancedTrigger={this.showAdvancedTrigger}
    />
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
  connectResource({
    namespace: 'advancedDrafts',
    endpoint: 'mails/templates/html',
    filters: {
      paginate_by: 100,
    },
    list: true,
    async: true,
    prefetch: false,
  }),
)(DraftListContainer)
