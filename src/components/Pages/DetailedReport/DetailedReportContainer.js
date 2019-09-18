import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { withRouter } from 'react-router-dom'

import DetailedReport from './DetailedReport'
import { connectResource } from 'common/utils/resource'


class DetailedReportContainer extends Component {
  onTabClick = (value, event, data = {}) => {
    event.preventDefault()
    this.props.history.push({
      state: { tabKey: value, ...data },
    })
  }

  componentWillUnmount() {
    this.props.report.setData(null)
  }

  render() {
    return <DetailedReport {...this.props} onTabClick={this.onTabClick} />
  }
}

export default compose(
  connect((_, props) => ({
    id: get(props.match, 'params.id'),
    tabKey: get(props, 'location.state.tabKey', 'overview'),
  })),
  connectResource({
    namespace: 'report',
    endpoint: 'reports',
    idKey: 'id',
    async: true,
    list: true,
  }),
  withRouter,
)(DetailedReportContainer)
