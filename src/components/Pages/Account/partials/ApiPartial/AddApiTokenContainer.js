import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { connectFormResource } from 'common/utils/resource'
import AddApiToken from './AddApiToken'


class AddApiTokenContainer extends Component {
  onSubmit = (e) => {
    const isUpdate = this.props.id
    return this.props.onSubmit(e)
      .then(_ => toast.success(<FormattedMessage id={`toasters.token.${isUpdate ? 'updated' : 'created'}`} />))
      .then(_ => isUpdate && this.props.onClose())
  }

  componentWillUnmount() {
    this.props.token.setData(null)
  }

  render() {
    return <AddApiToken {...this.props} onSubmit={this.props.handleSubmit(this.onSubmit)} />
  }
}

export default compose(
  connect((state, props) => ({
    id: props.id || get(state.resource.token, 'data.id'),
  })),
  connectFormResource({
    namespace: 'token',
    endpoint: 'tokens/:id?',
    idKey: 'id',
    list: true,
    async: true,
  }),
  reduxForm({
    form: 'tokens',
    enableReinitialize: true,
  })
)(AddApiTokenContainer)
