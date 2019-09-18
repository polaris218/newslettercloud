import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { compose } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import EmailConfirmation from './EmailConfirmation'


class EmailConfirmationContainer extends Component {
  state = {
    success: false,
  }

  resendConfirmation = () => {
    return this.props.resend.create()
      .then(res => toast.success(<FormattedMessage id="toasters.mail.sent" />))
  }

  confirmEmail = () => {
    return this.props.confirm.create({ hash: this.props.id })
      .then(_ => {
        this.setState({ success: true })
        toast.success(<FormattedMessage id="toasters.email.confirmed" />)
      })
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.profile.data && this.props.profile.data) {
      if(this.props.profile.data.email_confirmation_needed && this.props.id) {
        return this.confirmEmail()
      }
    }
  }

  componentWillUnmount() {
    this.props.confirm.setData(null)
    this.props.confirm.setErrors(null)
    this.props.resend.setData(null)
  }

  render() {
    return <EmailConfirmation {...this.props} {...this.state} resendConfirmation={this.resendConfirmation} />
  }
}

export default compose(
  connect((state, props) => ({
    id: get(props, 'match.params.id'),
  })),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    prefetch: false,
  }),
  connectResource({
    namespace: 'confirm',
    endpoint: 'confirm_email',
    prefetch: false,
  }),
  connectResource({
    namespace: 'resend',
    endpoint: 'signup/resend_confirm',
    prefetch: false,
  }),
)(EmailConfirmationContainer)
