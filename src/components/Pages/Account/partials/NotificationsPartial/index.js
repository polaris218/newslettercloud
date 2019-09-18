import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { connectResource } from 'common/utils/resource'
import NotificationsListContainer from './NotificationsListContainer'


class NotificationsPartial extends Component {
  state = {
    view: 'unread',
  }

  changeView = (e) => {
    this.setState({ view: e.currentTarget.id })
  }

  render() {
    const unseenMessagesCount = get(this.props.profile, 'data.unseen_messages')
    const { view } = this.state
    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            <li
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center pointer ${view === 'unread' && 'active'}`}
              id="unread"
              onClick={this.changeView}
            >
              <FormattedMessage id="notifications.unread" />
              {
                !!unseenMessagesCount &&
                <span className="badge badge-danger badge-pill">{unseenMessagesCount}</span>
              }
            </li>
            <li
              className={`list-group-item list-group-item-action pointer ${view === 'all' && 'active'}`}
              id="all"
              onClick={this.changeView}
            >
              <FormattedMessage id="notifications.all" />
            </li>
          </ul>
        </div>
        <div className="col-9">
          <NotificationsListContainer {...this.state} />
        </div>
      </div>
    )
  }
}

export default connectResource({
  namespace: 'profile',
  endpoint: 'profile',
  async: true,
  prefetch: false,
})(NotificationsPartial)
