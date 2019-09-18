import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { get } from 'lodash'

import { connectResource } from 'common/utils/resource'
import { generateSenderOptions } from 'common/utils/helpers'
import TestMail from './TestMail'


class TestMailContainer extends Component {
  state = {
    analytics: false,
    success: false,
  }

  onSubmit = (e) => {
    this.props.schedule.update({ subject: e.subject, id: this.props.id })
    const senderArray = e.sender.split(', ')
    const result = {
      lists: e.lists,
      sender_name: senderArray[0],
      sender_email: senderArray[1],
      test: 1,
      id: this.props.id,
    }

    return this.props.mailSend.create(result)
      .then(_ => this.setState({ success: true }))
  }

  componentDidMount() {
    this.props.schedule.fetch()
      .catch(err => this.props.history.push('/mails/drafts'))
  }

  componentWillUnmount() {
    this.props.senders.setData(null)
  }

  render() {
    return (
      <TestMail
        {...this.props}
        onSubmit={this.onSubmit}
        success={this.state.success}
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
    namespace: 'schedule',
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
      subject: get(state.resource, 'schedule.data.subject'),
    },
    formData: getFormValues('test')(state),
    lists: get(state.resource, 'lists.data'),
  })),
  reduxForm({
    form: 'test',
    enableReinitialize: true,
  })
)(TestMailContainer)
