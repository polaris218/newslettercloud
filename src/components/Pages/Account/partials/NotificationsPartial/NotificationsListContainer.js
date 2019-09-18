import React, { Component } from 'react'
import { compose } from 'redux'
import { get } from 'lodash'

import { connectResource } from 'common/utils/resource'
import NotificationsList from './NotificationsList'
import { defaultPagination } from 'common/utils/constants'


class NotificationsListContainer extends Component {
  state = {
    content: '',
  }

  generateList = () => {
    if(!get(this.props.notifications, 'data.length')) return []
    return this.props.notifications.data.filter(item => {
      if(this.props.view === 'unread') {
        return !item.seen
      }
      return true
    })
  }

  showContent = (e) => {
    if(this.state.content === e.currentTarget.id) {
      return this.setState({ content: '' })
    }
    this.setState({ content: e.currentTarget.id })
  }

  showNextPage = () => {
    if(this.generateList().length < 100) return
    const { notifications } = this.props
    this.props.notifications.filter({ ...notifications.filters, page: notifications.filters.page + 1 })
  }

  showPrevPage = () => {
    const { notifications } = this.props
    if(notifications.filters.page === 1) return
    this.props.notifications.filter({ ...notifications.filters, page: notifications.filters.page - 1 })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.view !== this.props.view) {
      this.props.notifications.filter({ page: 1 })
    }
  }

  componentWillUnmount() {
    this.props.notifications.setData(null)
    this.props.notifications.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <NotificationsList
      {...this.props}
      {...this.state}
      showContent={this.showContent}
      list={this.generateList()}
      showNextPage={this.showNextPage}
      showPrevPage={this.showPrevPage}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'notifications',
    endpoint: 'notifications',
    filters: {
      paginate_by: 100,
      page: 1,
    },
    list: true,
    async: true,
  }),
)(NotificationsListContainer)
