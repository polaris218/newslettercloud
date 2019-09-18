import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { connectResource } from 'common/utils/resource'
import { compose } from 'redux'


function PayByCardAccept({ invoice_id, invoice: { data } }){
  const invoiceData = data || {}
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title text-center">
                <FormattedMessage id="account.payByCard.thanksForUpgrading" />
              </h3>
              <p className="card-text text-muted  text-center">
                <FormattedMessage id="account.payByCard.yourAccountIsNowUpgraded" />
              </p>
              {invoice_id && <div className="d-flex justify-content-center mt-2 mb-4">
                <a className="btn btn-success" target="_blank" href={invoiceData.download_url}>
                  <FormattedMessage id="account.downloadInvoice" />
                </a>
              </div> }
             <p className="card-text text-muted  text-center">
               <FormattedMessage id="account.payByCard.youCanSee" /> <Link to={'/account'}><FormattedMessage id='account.billingHistory' /></Link>.
             </p>
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
  })
)
(PayByCardAccept)
