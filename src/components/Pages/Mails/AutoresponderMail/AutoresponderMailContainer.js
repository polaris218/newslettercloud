import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { get } from 'lodash'
import { toast } from 'react-toastify'

import { connectResource } from 'common/utils/resource'
import { generateSenderOptions } from 'common/utils/helpers'
import AutoresponderMail from './AutoresponderMail'
import CustomValidationError from 'components/CustomValidationError'


class AutoresponderMailContainer extends Component {
  state = {
    success: false,
  }

  onSubmit = (e) => {
    const result = {
      draft: e.id,
      list: e.list,
      time_to_send: e.time_to_send,
      subject: e.subject,
      sender: e.sender,
    }

    return this.props.responders.create(result)
      .then(_ => this.setState({ success: true }))
      .catch(err => {
        if(err.time_to_send) {
          toast.error(() => <CustomValidationError messages={err.time_to_send} />)
        }

        throw err
      })
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
      <AutoresponderMail
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
    senderOptions: generateSenderOptions(get(state.resource, 'senders.data'), true),
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
    namespace: 'responders',
    endpoint: 'responders',
    prefetch: false,
    idKey: 'draft',
    list: true,
  }),
  connect((state, props) => ({
    initialValues: {
      subject: get(state.resource, 'schedule.data.subject'),
      id: get(state.resource, 'schedule.data.id'),
      time_to_send: {
        days: 0,
        hours: 0,
      }
    },
    formData: getFormValues('schedule')(state),
    lists: get(state.resource, 'lists.data'),
  })),
  reduxForm({
    form: 'schedule',
    enableReinitialize: true,
  })
)(AutoresponderMailContainer)
