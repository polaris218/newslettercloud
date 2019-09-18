import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import InvoiceSettings from './InvoiceSettings'
import { connectResource } from 'common/utils/resource'


class InvoiceSettingsContainer extends Component {
  onSubmit = (e) => {
    return this.props.invoice.update({...e, invoice_delivery: parseInt(e.invoice_delivery)})
      .then(res => toast.success(<FormattedMessage id="toasters.invoice.updated" />))
  }

  render() {
    return <InvoiceSettings {...this.props} isLoading={this.props.invoice.isLoading} onSubmit={this.onSubmit} />
  }
}

export default compose(
  connectResource({
    namespace: 'invoice',
    endpoint: 'profile',
    form: true,
    async: true,
    refresh: true,
  }),
  reduxForm({
    form: 'invoiceSettings',
    enableReinitialize: true,
  })
)(InvoiceSettingsContainer)
