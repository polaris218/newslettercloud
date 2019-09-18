import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Cookies from 'js-cookie'

import { connectResource } from 'common/utils/resource'
import { getCookie, removeCookie } from 'lib/utils'
import { setData } from 'common/utils/resource'
import { getDomain } from 'common/utils/helpers'
import { logout } from 'common/session'


export class Authenticate extends Component {
  getUsersProfile = async () => {
    const [user, profile] = await Promise.all([this.props.user.fetch(), this.props.profile.fetch()])
    if(user instanceof Error || profile instanceof Error || !getCookie('jwt')) {
      Cookies.remove('jwt', { domain: getDomain().replace('app', '') })
      this.props.logout()
    } else {
      this.props.setData(
        { token: getCookie('jwt') },
        { resource: { namespace: 'session' } }
      )
    }
  }

  componentDidMount() {
    this.props.setData(
      { token: getCookie('jwt') },
      { resource: { namespace: 'session' } }
    )
    if (getCookie('jwt')) { this.getUsersProfile() }
    else { this.props.logout() }
    Cookies.set('isBeta', true, { domain: getDomain(null, true) })
  }

  componentWillUnmount() {
    this.props.profile.setData(null)
    this.props.user.setData(null)
  }

  render() {
    return this.props.children
  }
}
export default compose(
  connect(null, { setData, logout }),
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
)(Authenticate);
