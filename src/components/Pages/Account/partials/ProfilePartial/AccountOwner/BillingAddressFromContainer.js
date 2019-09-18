import React, { Component } from 'react'
import { reduxForm, getFormValues, change } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get, omit } from 'lodash'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import AddressForm from './AddressForm'
import { connectResource } from 'common/utils/resource'


const asyncValidate = (values, _ , props) => {
  if(values.country !== 'SE' && values.vat_id) {
    return props.checkvat.create({ country: values.country, vat_id: values.vat_id })
      .then(res => {
        if(!res.valid) {
          throw { vat_id: 'Invalid VAT ID' }
        }
      })
  }

  return new Promise((resolve) => resolve())
}

class BillingAddressFromContainer extends Component {
  onSubmit = (e) => {
    if(this.props.countryValue === 'SE') {
      e = omit(e, ['vat_id'])
    } else {
      e = omit(e, ['org_number'])
    }

    return this.props.billing.update(e)
      .then(res => toast.success(<FormattedMessage id="toasters.billingAddress.updated" />))
  }

  componentDidMount() {
    this.setState({ isBilling: this.props.profile.data.different_billing_address })
  }

  render() {
    return <AddressForm {...this.props} isBilling={true} isLoading={this.props.billing.isLoading} onSubmit={this.onSubmit} />
  }
}

export default compose(
  connectResource({
    namespace: 'billing',
    endpoint: 'profile/billing_address',
    form: true,
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'checkvat',
    endpoint: 'check_vat',
    prefetch: false,
    async: true,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    prefetch: false,
    async: true,
  }),
  connect(state => ({
    countryValue: get(getFormValues('billing')(state), 'country'),
  })),
  reduxForm({
    form: 'billing',
    enableReinitialize: true,
    asyncValidate,
    asyncBlurFields: ['vat_id'],
  })
)(BillingAddressFromContainer)
