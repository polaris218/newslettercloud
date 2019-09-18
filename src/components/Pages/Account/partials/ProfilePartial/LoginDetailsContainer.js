import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm, change } from 'redux-form'
import { connect } from 'react-redux'

import LoginDetails from './LoginDetails'
import { connectResource } from 'common/utils/resource'


class LoginDetailsContainer extends Component {
  state = {
    editPassword: false,
    showModal: false,
  }

  toggleEditPassword = (e, forceClose) => {
    this.setState({ editPassword: forceClose ? false : !this.state.editPassword })
    this.props.changeField('new_password', null)
    this.props.changeField('confirm_new_password', null)
  }

  onSubmit = (e) => {
    this.setState({ showModal: true })
  }

  onClose = () => {
    this.setState({ showModal: false })
    this.props.changeField('confirm_password', null)
  }

  render() {
    return <LoginDetails
      {...this.props}
      {...this.state}
      toggleEditPassword={this.toggleEditPassword}
      onSubmit={this.onSubmit}
      onClose={this.onClose}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'user',
    endpoint: 'user',
    async: true,
    form: true,
  }),
  connect(null, dispatch => ({
    changeField: (name, value) => dispatch(change('user', name, value))
  })),
  reduxForm({
    form: 'user',
  })
)(LoginDetailsContainer)
