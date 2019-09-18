import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { get } from 'lodash'

import { connectResource } from 'common/utils/resource'
import { generateSenderOptions } from 'common/utils/helpers'
import NowMail from './NowMail'
import API from 'api'


class NowMailContainer extends Component {
  state = {
    analytics: false,
    success: false,
    missingEmail: false,
    extraEmail: false,
    extra_price: null,
    order_id: null,
  }

  toggleAnalytic = (e) => {
    this.setState({ analytics: !this.state.analytics })
  }

  copyClipboard = (e) => {
    var copyText = document.getElementById('clipboard')
    copyText.select()
    document.execCommand('copy')
  }

  missingEmailTrigger = () => {
    this.setState({ missingEmail: !this.state.missingEmail })
  }

  extraMailTrigger = () => {
    return API('order_extra_mails').post({ amount: 100 })
      .then(resp => this.setState({ extraEmail: !this.state.extraEmail, order_id: resp.order_id, missingEmail: false }))
  }

  onSubmit = (e) => {
    this.props.nowMail.update({ subject: e.subject, id: this.props.id })
    const senderArray = e.sender.split(', ')
    const result = {
      lists: e.lists,
      sender_name: senderArray[0],
      sender_email: senderArray[1],
      test: 0,
      id: this.props.id,
      missingEmail: false,
    }

    if(this.state.analytics) {
      result.tracking = [{
        type: 0,
        params: {
          utm_campaign: e.utm_campaign,
          utm_source: e.utm_source,
        }
      }]
    }

    return this.props.mailSend.create(result)
      .then(resp => {
        if(resp.pending_review) {
          this.props.history.push('/mails/pending_review')
        } else {
          return this.props.nowMail.fetch({}, { endpoint: `mails/sent` })
            .then(_ => this.setState({ success: true }))
        }
      })
      .then(_ => this.setState({ success: true }))
      .catch(err => {
        if(err.errors.missing_email_balance) {
          this.setState(
            { extra_price: err.errors.email_item_price * 100 },
            () => this.missingEmailTrigger()
          )
        }

        throw err
      })
  }

  componentDidMount() {
    this.props.nowMail.fetch()
      .catch(err => this.props.history.push('/mails/drafts'))
  }

  componentWillUnmount() {
    this.props.senders.setData(null)
  }

  render() {
    return (
      <NowMail
        {...this.props}
        {...this.state}
        toggleAnalytic={this.toggleAnalytic}
        onSubmit={this.onSubmit}
        copyClipboard={this.copyClipboard}
        missingEmailTrigger={this.missingEmailTrigger}
        extraMailTrigger={this.extraMailTrigger}
      />
    );
  }
}

export default compose(
  connectResource({
    namespace: 'senders',
    endpoint: 'senders',
    list: true,
    filters: {
      ordering: 'name',
    },
    async: true,
  }),
  connect((state, props) => ({
    senderOptions: generateSenderOptions(get(state.resource, 'senders.data')),
    id: get(props.match, 'params.id'),
  })),
  connectResource({
    namespace: 'nowMail',
    endpoint: 'mails/drafts/:id?',
    prefetch: false,
    idKey: 'id',
    async: true,
  }),
  connectResource({
    namespace: 'mailSend',
    endpoint: 'mails/drafts/:id?/send',
    prefetch: false,
    idKey: 'id',
    form: true,
  }),
  connect((state, props) => ({
    initialValues: {
      ...get(state.resource, 'mailSend.data'),
      subject: get(state.resource, 'nowMail.data.subject'),
      utm_source: 'getanewsletter',
      utm_campaign: `cmp_${props.id}`,
    },
    formData: getFormValues('now')(state),
    lists: get(state.resource, 'lists.data'),
  })),
  reduxForm({
    form: 'now',
    enableReinitialize: true,
  })
)(NowMailContainer)
