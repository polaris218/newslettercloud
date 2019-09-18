import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { omit } from 'lodash'

import { connectResource, setData } from 'common/utils/resource'
import { onSubmitFail } from 'common/utils/helpers'
import UpgradeInformation from './UpgradeInformation'

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

class UpgradeInformationContainer extends Component {
  state = {
    isBilling: false,
    isSummary: false,
  }

  viewBilling = (e) => {
    this.setState({ isBilling: !this.state.isBilling }, () => {
      return this.props.profile.update({ different_billing_address: this.state.isBilling })
    })
  }

  componentDidMount() {
    this.setState({ isBilling: this.props.profile.data.different_billing_address })
  }

  onSubmit = () => {
    if(!this.props.valid) return
    let e = this.props.form
    if(e.country === 'SE') {
      e = omit(e, ['vat_id'])
    } else {
      e = omit(e, ['org_number'])
    }

    return this.props.address.update(e)
      .then(res => this.props.history.push('/upgrade/summary'))
  }

  handleSubmit = () => {
    return this.props.handleSubmit(this.onSubmit)()
  }

  render() {
    return <UpgradeInformation
      {...this.props}
      {...this.state}
      onSubmit={this.handleSubmit}
      isLoading={this.props.address.isLoading}
      viewBilling={this.viewBilling}
    />
  }
}

export default compose(
  connectResource({
    namespace: 'articleData',
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
    prefetch: false,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    prefetch: true,
  }),
  reduxForm({
    form: 'address',
    enableReinitialize: true,
    asyncValidate,
    asyncBlurFields: ['vat_id'],
    onSubmitFail,
  }),
  connect(state => ({
    form: getFormValues('address')(state),
  }), { setData })
)(UpgradeInformationContainer)
