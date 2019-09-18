import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import OpeningsAndClicks from './OpeningsAndClicks'
import { connectResource } from 'common/utils/resource'
import { mapChartData } from 'common/utils/helpers'
import { defaultChartData } from 'components/Chart'
import API from 'api'


const reducer = (acc, current) => acc + current.count

class OpeningsAndClicksContainer extends Component {
  state = {
    navButtons: [
      {
        name: 'First 24 hours',
        active: true
      },
      {
        name: 'All activity',
        active: false
      }
    ],
    chartData: [defaultChartData, defaultChartData],
    dataIndex: 0,
    uniqueDailyOpenings: 0,
    uniqueAllOpenings: 0,
    isLoading: false,
  }

  onNavBtnClick = (index, event) => {
    if (event) event.preventDefault()
    const navButtons = this.state.navButtons.map((item, i) => ({ name: item.name, active: i === index }))
    this.setState({ navButtons, dataIndex: index })
  }

  getOpenings = async () => {
    this.setState({ chartData: [defaultChartData, defaultChartData], isLoading: true })
    const [dailyOpenings, allOpenings] = await Promise.all([
      API(`reports/${this.props.id}/opens/aggregated`).get({ first_24h: true }),
      API(`reports/${this.props.id}/opens/aggregated`).get({ all_time: true }),
    ])

    if(!dailyOpenings || !allOpenings) {
      return this.setState({ isLoading: false })
    } else {
      this.setState({
        chartData: [mapChartData(dailyOpenings), mapChartData(allOpenings)],
        isLoading: false,
        uniqueDailyOpenings: dailyOpenings.unique.reduce(reducer, 0),
        uniqueAllOpenings: allOpenings.unique.reduce(reducer, 0),
      })
      this.onNavBtnClick(0)
    }
  };

  componentDidMount() {
    this.getOpenings()
  }

  render() {
    return <OpeningsAndClicks
      {...this.props}
      {...this.state}
      onNavBtnClick={this.onNavBtnClick}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'report',
    prefetch: false,
  }),
  withRouter
)(OpeningsAndClicksContainer)
