import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import AddressFormContainer from './AddressFormContainer'
import BillingAddressFromContainer from './BillingAddressFromContainer'
import InvoiceSettingsContainer from './InvoiceSettingsContainer'
import { connectResource } from 'common/utils/resource'


class AccountOwner extends Component {
  state = {
    isBilling: false,
  }

  viewBilling = (e) => {
    this.setState({ isBilling: !this.state.isBilling }, () => {
      return this.props.profile.update({ different_billing_address: this.state.isBilling })
    })
  }

  componentDidMount() {
    this.props.profile.fetch()
      .then(resp => this.setState({ isBilling: resp.different_billing_address }))
  }

  render() {
    return (
      <>
        <div className="card mb-5">
          <div className="card-body">
            <h4 className="card-title"><FormattedMessage id="profile.accountOwner" /></h4>
            <p className="card-text">
              <FormattedMessage id="profile.accountOwner.description" />
            </p>
            <AddressFormContainer />
          </div>
        </div>
        <div className="card mb-5">
          <div className="card-body">
            <h4 className="card-title"><FormattedMessage id="profile.invoiceSettings" /></h4>
            <InvoiceSettingsContainer viewBilling={this.viewBilling} isBilling={this.state.isBilling} />
          </div>
        </div>
        {
          this.state.isBilling &&
          <div className="card mb-5">
            <div className="card-body">
              <h4 className="card-title"><FormattedMessage id="profile.billingAddress" /></h4>
              <BillingAddressFromContainer />
            </div>
          </div>
        }
      </>
    )
  }
}

export default connectResource({
  namespace: 'profile',
  endpoint: 'profile',
  prefetch: false,
  async: true,
})(AccountOwner)
