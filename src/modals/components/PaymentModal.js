import React, { Component } from 'react'
import { compose } from 'redux'
import get from 'lodash/get'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import { connectResource } from 'common/utils/resource'
import Spinner from 'components/Spinner'
import { getPaymentUrl, getDomain } from 'common/utils/helpers'
import { getDefaultDate } from 'common/utils/formatDate'
import API from 'api'


function CurrentCard({ profile, invoice, payWithExistingCard, payWithNewCardTrigger, amount }) {
  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <p className="small mb-1"><FormattedMessage id="card.yourCurrentCard" /></p>
          <p>
            <pre>
              {profile.data.active_card}
            </pre>
          </p>
          <button className="btn btn-link p-0 mb-1" onClick={payWithNewCardTrigger}>
            <span className="small font-weight-bold link link-underline">
              <FormattedMessage id="card.newCard" />
            </span>
          </button>
          <hr />
          <p><FormattedMessage id="card.date" />: {getDefaultDate(get(invoice, 'data.due_date'))}</p>
        </div>
        <div className="col">
          <div className="card mb-3 bg-light">
            <div className="card-body text-center">
              <p className="small mb-1"><FormattedMessage id="invoices.amount" /></p>
              <h3>{profile.data.currency_code} {amount || get(invoice, 'data.total_amount', 0)}</h3>
            </div>
          </div>
          <button className="btn btn-success btn-block" onClick={payWithExistingCard}><FormattedMessage id="card.pay" /></button>
        </div>
      </div>
    </>
  )
}

class PaymentModal extends Component {
  state = {
    payWithNewCard: false,
  }

  componentDidMount() {
    let paymentwindow
    const PaymentWindow = window.PaymentWindow
    if(this.props.id) {
      this.props.invoice.fetch()
    }
    this.props.payment.filter({...this.props.payment.filters, ...this.props.filters})
      .then(resp => {
        return paymentwindow = new PaymentWindow(resp)
      })
      .then(_ => {
        paymentwindow.close()
        paymentwindow.append('payment')
        return paymentwindow.open()
      })
  }

  componentWillUnmount() {
    this.props.payment.setData(null)
  }

  payWithExistingCard = () => {
    const { order_id } = this.props.filters
    return API('pay_order/existing_card').post({ order_id })
      .then(res => {
        if(res.status === 'FAIL_PERMANENT') {
          return toast.error(<FormattedMessage id="errors.payment" />)
        }
        return this.props.history.push('/pay-by-card/accept')
      })
  }

  payWithNewCardTrigger = () => {
    this.setState({ payWithNewCard: !this.state.payWithNewCard })
  }

  render() {
    const { onClose, profile, isChangeCard } = this.props
    const { payWithNewCard } = this.state
    const isCurrentCard = profile.data.active_card && !payWithNewCard && !isChangeCard
    return (
      <Modal onClose={ onClose }>
        <ModalHeader onClose={onClose} name="Payment" />
        <ModalBody>
          {
            isCurrentCard && <CurrentCard {...this.props} payWithExistingCard={this.payWithExistingCard} payWithNewCardTrigger={this.payWithNewCardTrigger} />
          }
          <div id="payment" className={`text-center ${isCurrentCard ? 'd-none' : ''}`} />
        </ModalBody>
        <ModalFooter>
          <div class="row">
            <div class="col-2">
              <img src="https://d7vuwcueykwhl.cloudfront.net/integration/ewindow/Images/window/epay_logo.png" />
            </div>
            <div class="col-8">
              <p class="small m-0">
                ePay / Payment Solutions is PCI certified by VISA / Mastercard and all communication is encrypted via a secure connection.
              </p>
            </div>
            <div class="col-2 text-right">
              <img src="https://d7vuwcueykwhl.cloudfront.net/integration/ewindow/Images/window/secure_logo.png" />
            </div>
          </div>
        </ModalFooter>
      </Modal>
    )
  }
}

export default compose(
  connectResource({
    namespace: 'payment',
    endpoint: 'order_window_options',
    prefetch: false,
    list: true,
    filters: {
      accepturl: getPaymentUrl(`upgrade/pay-by-card/accept/`),
      cancelurl: getPaymentUrl(`upgrade/cancel/`),
      cssurl: getPaymentUrl(`styles/epay.css/`),
      iframeheight: '550',
      iframewidth: '730',
    }
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    prefetch: false,
  }),
  connectResource({
    namespace: 'invoice',
    endpoint: 'invoices',
    idKey: 'id',
    list: true,
    prefetch: false,
  }),
  withRouter
)(PaymentModal)
