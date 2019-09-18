import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import omit from 'lodash/omit'
import get from 'lodash/get'
import { toast } from 'react-toastify'

import AffiliateRequestPayment from './AffiliateRequestPayment'
import { connectResource, setData } from 'common/utils/resource'
import CustomValidationError from 'components/CustomValidationError'


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

class AffiliateRequestPaymentContainer extends Component {
  state = {
    isBilling: false,
    isConfirmed: false,
    isSuccess: false,
  }

  checkboxHandler = (e) => {
    this.setState({ [e.currentTarget.id]: !this.state[e.currentTarget.id] })
  }

  onSubmit = (e) => {
    if(!this.props.valid) return
    if(e.country === 'SE') {
      e = omit(e, ['vat_id'])
    } else {
      e = omit(e, ['org_number'])
    }

    return this.props.address.update(e)
      .then(_ => e.bgnumber && this.requestPayment({ bgnumber: e.bgnumber }))
  }

  requestPayment = (data) => {
    return this.props.request.create(data)
      .then(_ => this.setState({ isSuccess: true }))
      .then(_ => this.props.comission.fetch())
      .catch(err => {
        if(err.commission_amount) {
          toast.error(() => <CustomValidationError messages={err.commission_amount} />)
        }
        throw err
      })
  }

  render() {
    return <AffiliateRequestPayment
      {...this.props}
      {...this.state}
      onSubmit={this.onSubmit}
      checkboxHandler={this.checkboxHandler}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'request',
    endpoint: 'affiliate/request_payment',
    prefetch: false,
  }),
  connectResource({
    namespace: 'checkvat',
    endpoint: 'check_vat',
    prefetch: false,
    async: true,
  }),
  connectResource({
    namespace: 'address',
    endpoint: 'profile/address',
    form: true,
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'comission',
    endpoint: 'affiliate/commission',
    list: true,
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    async: true,
    prefetch: false,
  }),
  reduxForm({
    form: 'address',
    enableReinitialize: true,
    asyncValidate,
    asyncBlurFields: ['vat_id'],
  }),
  connect(state => ({
    countryValue: get(getFormValues('address')(state), 'country'),
  }), { setData })
)(AffiliateRequestPaymentContainer)
