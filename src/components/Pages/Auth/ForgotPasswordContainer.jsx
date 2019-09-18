import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'

import { toast } from 'react-toastify'
import { connectFormResource } from 'common/utils/resource'
import ForgotPassword from './ForgotPassword'


class ForgotPasswordContainer extends Component {

  onSubmit = (data) => {
    return this.props.resetPassword.create(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.resetLink.check" />))
      .then(_ => {
        this.props.history.push('/')
      })
  }


  render() {
    return (
      <ForgotPassword
        {...this.props}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default compose(
  connectFormResource({
    namespace: 'resetPassword',
    endpoint: 'reset_password',
    prefetch: false,
  }),
  reduxForm({
    form: 'forgot',
  }),
)(ForgotPasswordContainer)
