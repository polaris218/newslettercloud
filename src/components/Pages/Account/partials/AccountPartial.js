import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import AccountStatus from 'components/AccountStatus'
import Invoices from 'components/Invoices/InvoicesContainer'
import { connectResource } from 'common/utils/resource'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import API from 'api'
import PaymentModal from 'modals/components/PaymentModal'
import { getPaymentUrl } from 'common/utils/helpers'


class AccountPartial extends Component {
  state = {
    order_id: null,
    showCardModal: false,
  }

  changeCardTrigger = () => {
    if(!this.state.showCardModal) {
      return API('order_change_card').post()
        .then(res => this.setState({ order_id: res.order_id, showCardModal: true }))
    }

    return this.setState({ showCardModal: false, order_id: null })
  }

  render() {
    const paused = get(this.props.profile, 'data.subscription.on_hold_since')
    const activeCard = get(this.props.profile, 'data.active_card')
    const showPauseFlow = get(this.props.profile, 'data.subscription.is_contact_based') &&
    !get(this.props.profile, 'data.subscription.is_free') &&
    !get(this.props.profile, 'data.profile.subscription.cancelled') &&
    get(this.props.profile, 'data.subscription.number_of_months') === 1
    return (
      <>
        {
          this.state.showCardModal &&
          <PaymentModal
            onClose={this.changeCardTrigger}
            filters={{
              order_id: this.state.order_id,
              accepturl: getPaymentUrl(`upgrade/new-credit-card/`),
              cancelurl: getPaymentUrl(`upgrade/cancel/`),
            }}
            isChangeCard={true}
          />
        }
        <div className="row mb-3">
          <div className="col">
            <h2><FormattedMessage id="account.title" /></h2>
            <p className="mb-4">
              <FormattedMessage id="account.description" />
            </p>
            <div className="card bg-light mb-4">
              <div className="card-body pt-4 pb-4">
                <AccountStatus />
              </div>
            </div>
          </div>
        </div>
        {
          activeCard &&
          <div className="card mb-5">
            <div className="card-body">
              <h3 className="card-title"><FormattedMessage id="account.activeCard" /></h3>
              <p><FormattedMessage id="account.activeCardDescription" /></p>
              <div className="input-group mb-3">
                <input type="text" className="form-control" disabled={true} value={activeCard} />
                <div className="input-group-append">
                  <ModalConfirmationTrigger
                    message={<FormattedMessage id="account.card.removed" />}
                    onConfirm={this.changeCardTrigger}
                  >
                    <button className="btn btn-success" type="button"><FormattedMessage id="account.changeCard" /></button>
                  </ModalConfirmationTrigger>
                </div>
              </div>
            </div>
          </div>
        }
        <Invoices />
        <div className="row mb-3">
          <div className="col">
            <div className="card-group">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"><FormattedMessage id="account.upgradeAccount" /></h5>
                  <p className="card-text">
                    <FormattedMessage id="account.upgradeAccountDescription" />
                  </p>
                </div>
                <div className="card-footer pb-4 bg-transparent border-0">
                  <Link to="/upgrade" className="btn btn-success">
                    <FormattedMessage id="account.upgrade" />
                  </Link>
                </div>
              </div>
              {
                showPauseFlow &&
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><FormattedMessage id={paused ? 'account.activateAccount' : 'account.pauseAccount'} /></h5>
                    <p className="card-text">
                      <FormattedMessage id={paused ? 'account.activateAccountDescription' : 'account.pauseAccountDescription'} />
                    </p>
                  </div>
                  <div className="card-footer pb-4 bg-transparent border-0">
                    <Link className="btn btn-secondary" to="/account/pause"><FormattedMessage id={paused? 'account.activate' : 'account.pause'} /></Link>
                  </div>
                </div>
              }
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"><FormattedMessage id="account.deleteAccount" /></h5>
                  <p className="card-text">
                    <FormattedMessage id="account.deleteAccountDescription" />
                  </p>
                </div>
                <div className="card-footer pb-4 bg-transparent border-0">
                  <Link className="btn btn-danger" to="/account/delete"><FormattedMessage id="common.delete" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connectResource({
  namespace: 'profile',
  endpoint: 'profile',
  async: true,
  prefetch: false,
})(AccountPartial)
