import React, { Component } from 'react'

import BouncesChart from './BouncesChart'
import DetailedOverviewModel from '../DetailedOverviewModel'


export default class BouncesChartContainer extends Component {
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
    return <BouncesChart {...this.props} {...this.state} />
  }
}
