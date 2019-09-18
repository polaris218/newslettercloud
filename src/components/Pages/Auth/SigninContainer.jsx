import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import Cookies from 'js-cookie'

import { connectFormResource, connectResource } from 'common/utils/resource'
import Signin from './Signin'
import { getDomain, getCookieDomain } from 'common/utils/helpers'


class SigninContainer extends Component {

  onSubmit = (data) => {
    return this.props.session.create(data)
      .then(_ => {
        if (Cookies.get('jwt')) {
          Cookies.set('logged_in', true, { domain: getCookieDomain() })
          this.getUsersProfile()
        }
      })
  }

  getUsersProfile = async () => {
    Promise.all([this.props.user.fetch(), this.props.profile.fetch()])
    .then(_ => this.props.history.push('/'))
  }

  render() {
    return (
     <Signin
       {...this.props}
       onSubmit={this.onSubmit}
     />
    )
  }
}

export default compose(
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    async: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'user',
    endpoint: 'user',
    async: true,
    prefetch: false,
  }),
  connectFormResource({
    namespace: 'session',
    endpoint: 'api-token-auth',
    prefetch: false,
  }),
  reduxForm({
    form: 'sender',
  }),
)(SigninContainer)
