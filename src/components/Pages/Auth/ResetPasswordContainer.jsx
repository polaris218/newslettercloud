import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectFormResource } from 'common/utils/resource'
import ResetPassword from './ResetPassword'


class ResetPasswordContainer extends Component {

  onSubmit = (data) => {
    return this.props.resetPasswordConfirm.create(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.password.changed" />))
      .then(_ => {
        this.props.history.push('/')
      })
  }


  render() {
    return (
      <ResetPassword
        {...this.props}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default compose(
  connectFormResource({
    namespace: 'resetPasswordConfirm',
    endpoint: 'reset_password_confirm',
    prefetch: false,
  }),
  connect((state, props) => ({
    initialValues: {
      token: get(props, 'match.params.token'),
      uidb64: get(props, 'match.params.uidb64'),
    }
  })),
  reduxForm({
    form: 'resetPassword',
  }),
)(ResetPasswordContainer)
