import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Cookies from 'js-cookie'

import { logout } from 'common/session'
import { connectResource } from 'common/utils/resource'
import { getDomain, getCookieDomain } from 'common/utils/helpers'
import LoggedOut from './LoggedOut'


class LoggedOutContainer extends Component {
  state = {
    posts: [],
  }

  async componentDidMount() {
    Cookies.remove('logged_in', { domain: getCookieDomain() })
    this.props.logout()
    this.props.user.setData(null)
    this.props.profile.setData(null)
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')

    try {
      const response = await fetch(process.env.REACT_APP_BLOGG_LINK, {
        method: 'GET',
        headers: headers
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      this.setState({ posts: json.posts })
    } catch (error) { }
  }

  render() {
    return (
      <LoggedOut
        {...this.props}
        {...this.state}
      />
    )
  }
}


export default compose(
  connect(null, { logout }),
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
)(LoggedOutContainer)
