import React from 'react'
import { FormattedMessage } from 'react-intl'

import { SelectField } from 'common/forms/fields'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'


const invoiceOptions = [
  { value: 0, label: <FormattedMessage id="profile.invoiceSettings.sendingByEmail" /> },
  { value: 1, label: <FormattedMessage id="profile.invoiceSettings.sendingByPost" /> },
]

export default function InvoiceSettings({ handleSubmit, onSubmit, invoice, viewBilling, isBilling, isLoading }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <SelectField label={<FormattedMessage id="profile.invoiceSettings.sendingOptions" />} name="invoice_delivery" options={invoiceOptions} />
            <small id="emailHelp" className="form-text text-muted">
              <FormattedMessage id="profile.invoiceSettings.description" />
            </small>
          </div>
        </div>
      </div>
      <ButtonSpinner
        type="submit"
        className="btn btn-success"
        spin={invoice.isLoading}
        disabled={invoice.isLoading}
      >
        <FormattedMessage id="profile.invoiceSettings.updateInvoiceSettings" />
      </ButtonSpinner>
      <div className="custom-control custom-checkbox mt-3">
        <input
          type="checkbox"
          className="custom-control-input"
          id="showBilling"
          onChange={viewBilling}
          value={isBilling}
          checked={isBilling}
        />
        <label className="custom-control-label" htmlFor="showBilling">
          <FormattedMessage id="profile.invoiceSettings.differentBillingAddress" />
        </label>
      </div>
      <Spinner show={isLoading} />
    </form>
  )
}
