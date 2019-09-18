import React, { Component } from 'react'
import { reduxForm, getFormValues } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import get from 'lodash/get'
import { toast } from 'react-toastify'

import { getCookie } from 'lib/utils'
import { connectFormResource, connectResource } from 'common/utils/resource'
import Signup from './Signup'
import { getDomain, getCookieDomain } from 'common/utils/helpers'


class SignupContainer extends Component {

  onSubmit = (data) => {
    return this.props.session.create(data)
      .then(_ => {
        if (getCookie('jwt')) {
          Cookies.set('logged_in', true, { domain: getCookieDomain() })
          this.getUsersProfile()
        }
      })
      .catch(err => {
        if(err.errors['0'] === 'R') {
          toast.error(Object.values(err.errors).join(''))
        }
        throw err
      })
  }

  getUsersProfile = async () => {
    await Promise.all([this.props.user.fetch(), this.props.profile.fetch()])
    this.props.history.push('/')
  }

  render() {

    return (
      <Signup
        {...this.props}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default compose(
  connect((state, props) => ({
    email: get(getFormValues('signup')(state), 'email'),
  })),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    prefetch: false,
    async: true,
  }),
  connectResource({
    namespace: 'user',
    endpoint: 'user',
    prefetch: false,
    async: true,
  }),
  connectFormResource({
    namespace: 'session',
    endpoint: 'signup',
    prefetch: false,
  }),
  reduxForm({
    form: 'signup',
  }),
)(SignupContainer)
