import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm, getFormValues, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { get, omit } from 'lodash'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import AddressForm from './AddressForm'



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

class AddressFormContainer extends Component {
  onSubmit = (e) => {
    if(e.country === 'SE') {
      e = omit(e, ['vat_id'])
      e.org_number = e.org_number || null
    } else {
      e = omit(e, ['org_number'])
      e.vat_id = e.vat_id || null
    }

    return this.props.address.update(e)
      .then(res => toast.success(<FormattedMessage id="toasters.owner.updated" />))
  }

  render() {
    return <AddressForm {...this.props} onSubmit={this.onSubmit} isLoading={this.props.address.isLoading} />
  }
}

export default compose(
  connectResource({
    namespace: 'address',
    endpoint: 'profile/address',
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
  reduxForm({
    form: 'address',
    enableReinitialize: true,
    asyncValidate,
    asyncBlurFields: ['vat_id'],
  }),
  connect(state => ({
    countryValue: get(getFormValues('address')(state), 'country'),
  }))
)(AddressFormContainer)
