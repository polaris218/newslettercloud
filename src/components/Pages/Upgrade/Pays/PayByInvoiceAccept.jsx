import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { connectResource } from 'common/utils/resource'
import { compose } from 'redux'


function PayByInvoiceAccept({ invoice_id, invoice: { data } }) {
  const invoiceData = data || {}
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-body p-5">
              <div className="row justify-content-center">
                <div className="col-10">
                  <img width="15%" className="mx-auto d-block mb-4" src="/img/upgrade.svg" />
                  <h2 className="card-title text-center mb-4">
                    <FormattedMessage id="account.payByInvoice.yourInvoiceHasBeenSent" />
                  </h2>
                  <p className="card-text text-center mb-4">
                    <FormattedMessage id="account.payByInvoice.thankYou" />&nbsp;
                    <FormattedMessage id="account.payByInvoice.asSoonAsWeRecieveYourPayment" /> <Link to={'/account'}><FormattedMessage id='account.billingHistory' /></Link>.
                  </p>
                  {invoice_id && <div className="d-flex justify-content-center mt-2 mb-2">
                    <div className="d-flex justify-content-center mt-2 mb-4">
                      <a className="btn btn-success" target="_blank" href={invoiceData.download_url}>
                        <FormattedMessage id="account.downloadInvoice" />
                      </a>
                    </div>
                  </div> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default compose(
  connect(state =>
    ({ invoice_id: get(state, 'resource.upgradeAccount.data.invoice_id') })
  ),
  connectResource({
    namespace: 'invoice',
    endpoint: 'invoices',
    list: true,
    idKey: 'invoice_id',
    async: true,
    refresh: true,
  })
)
(PayByInvoiceAccept)
