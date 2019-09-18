import React, { Component } from 'react'

import NotificationMessage from './NotificationMessage'
import { updateNotification } from 'services/notifications'
import { connectResource } from 'common/utils/resource'


class NotificationMessageContainer extends Component {
  componentDidUpdate(prevProps) {
    if(!prevProps.collapse && this.props.collapse) {
      let urlArray = this.props.data.url.split('/')
      let id = urlArray[urlArray.length - 2]

      if(!this.props.data.seen) {
        updateNotification(id, {seen: true})
          .then(_ => this.props.profile.fetch())
      }
    }
  }

  render() {
    return <NotificationMessage {...this.props} />
  }
}

export default connectResource({
  namespace: 'profile',
  endpoint: 'profile',
  async: true,
  prefetch: false,
})(NotificationMessageContainer)
