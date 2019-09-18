import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash/get'

import HomeHeader from './HomeHeader'
import { connectResource } from 'common/utils/resource'
import { getStatus } from 'common/utils/helpers'


class HomeHeaderContainer extends Component {
  componentWillUnmount() {
    this.props.progress.setData(null)
  }

  render() {
    return <HomeHeader {...this.props} />
  }
}

export default compose(
  connectResource({
    namespace: 'user',
    endpoint: 'user',
    async: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'progress',
    endpoint: 'profile/progress',
    list: true,
    async: true,
  }),
  connect(state => ({
    confirmEmail: getStatus(get(state.resource.progress, 'data'), 'email_confirmed'),
    collectSubscribers: getStatus(get(state.resource.progress, 'data'), 'collected_contacts_10'),
    createdEmails: getStatus(get(state.resource.progress, 'data'), 'created_email'),
    sendEmail: getStatus(get(state.resource.progress, 'data'), 'sent_real_email'),
  })),
)(HomeHeaderContainer)
