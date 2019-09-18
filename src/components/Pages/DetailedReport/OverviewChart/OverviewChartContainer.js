import React, { Component } from 'react'

import OverviewChart from './OverviewChart'
import DetailedOverviewModel from '../DetailedOverviewModel'


export default class OverviewChartContainer extends Component {
  state = {
    overview: DetailedOverviewModel.NULL,
  }

  componentDidMount() {
    this.setState({ overview: DetailedOverviewModel.create(this.props.data) })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isLoading && !this.props.isLoading) {
      this.setState({ overview: DetailedOverviewModel.create(this.props.data) })
    }
  }

  render() {
    return <OverviewChart {...this.props} {...this.state} />
  }
}
