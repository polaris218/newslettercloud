import React, { Component } from 'react'
import { compose } from 'redux'
import get from 'lodash/get'

import { connectResource } from 'common/utils/resource'
import OverpaidInvoiceModal from './OverpaidInvoiceModal'
import API from 'api'


class OverpaidInvoiceModalContainer extends Component {
  state = { isSuccess: false, isLoading: false }

  onSubmit = () => {
    this.setState({ isLoading: true })
    return API(`repay_overpaid`).post({
      bgno: '',
      order: get(this.props.invoice, 'data.order_id'),
      type: 'CARD',
    })
      .then(_ => this.setState({ isSuccess: true, isLoading: false }))
      .catch(err => {
        this.setState({ isLoading: false })
        throw err
      })
  }

  componentWillUnmount() {
    this.props.invoice.setData(null)
  }

  componentDidMount() {
    this.props.overpaid.filter({ invoice_id: this.props.id })
  }

  render() {
    return <OverpaidInvoiceModal {...this.state} {...this.props} onSubmit={this.onSubmit} />
  }
}


export default compose(
  connectResource({
    endpoint: 'invoices',
    namespace: 'invoice',
    async: true,
    list: true,
    idKey: 'id',
  }),
  connectResource({
    endpoint: 'overpaid_info',
    namespace: 'overpaid',
    async: true,
    list: true,
    prefetch: false,
  })
)(OverpaidInvoiceModalContainer)
