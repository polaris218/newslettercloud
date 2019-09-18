import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import get from 'lodash/get'

import UpgradeSummary from './UpgradeSummary'
import { connectResource } from 'common/utils/resource'

class UpgradeSummaryContainer extends Component {
  state = {
    showPaymentModal: false,
    isCard: true,
  }

  selectMethod = () => {
    this.setState({ isCard: !this.state.isCard })
  }

  onSubmit = () => {
    let request = {
      article: this.props.articleData.data.id,
      pay_by_card: this.state.isCard ? 1 : 0,
      start: this.props.articleData.data.start,
    }

    if(this.state.isCard) {
      if(get(this.props.upgradeAccount, 'data.order_id')) {
        return this.showPaymentModalTrigger()
      }
      return this.props.upgradeAccount.create(request)
        .then(_ => this.showPaymentModalTrigger())
    } else {
      return this.props.upgradeAccount.create(request)
        .then(_ => this.props.history.push('/upgrade/pay-by-invoices/accept'))
    }
  }

  showPaymentModalTrigger = () => {
    this.setState({ showPaymentModal: !this.state.showPaymentModal })
  }

  componentDidMount() {
    if(this.props.address.data) {
      const { country } = this.props.address.data
      this.props.checkvat.create({ country, vat_id: 'test' })
    }
  }

  render() {
    return <UpgradeSummary
      {...this.props}
      {...this.state}
      selectMethod={this.selectMethod}
      onSubmit={this.onSubmit}
      onClose={this.showPaymentModalTrigger}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'articleData',
    prefetch: false,
  }),
  connectResource({
    namespace: 'address',
    prefetch: false,
  }),
  connectResource({
    namespace: 'billing',
    endpoint: 'profile/billing_address',
  }),
  connectResource({
    namespace: 'upgradeAccount',
    endpoint: 'upgrade_account',
    prefetch: false,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    refresh: true,
  }),
  connectResource({
    namespace: 'user',
    endpoint: 'user',
    refresh: true,
  }),
  connectResource({
    namespace: 'discount',
    prefetch: false,
  }),
  connectResource({
    namespace: 'checkvat',
    endpoint: 'check_vat',
    prefetch: false,
  }),
)(UpgradeSummaryContainer)
