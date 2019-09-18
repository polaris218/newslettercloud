import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectFormResource } from 'common/utils/resource'
import AddSenders from './AddSenders'


class AddSendersContainer extends Component {
  onSubmit = (e) => {
    return this.props.onSubmit(e)
      .then(_ => toast.success(<FormattedMessage id={`toasters.sender.${this.props.id ? 'updated' : 'created'}`} />))
      .then(_ => this.props.onClose())
  }

  componentWillUnmount() {
    this.props.sender.setData(null)
  }

  render() {
    return <AddSenders {...this.props} onSubmit={this.onSubmit} />
  }
}



export default compose(
  connectFormResource({
    namespace: 'sender',
    endpoint: 'senders/:id?',
    idKey: 'id',
    list: true,
    async: true,
  }),
  reduxForm({
    form: 'sender',
  })
)(AddSendersContainer)
