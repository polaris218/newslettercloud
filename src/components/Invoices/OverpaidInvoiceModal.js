import React from 'react'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'


export default function OverpaidInvoiceModal({ onClose, overpaid, invoice, isSuccess, onSubmit, isLoading }) {
  return (
    <Modal onClose={onClose} className="confirmation-modal">
      <ModalBody>
        {
          isSuccess ?
          <>
            <h4><FormattedMessage id="invoices.inProgress" /></h4>
            <p>
              <FormattedMessage id="invoices.willRepay" values={{
                balance: get(invoice, 'data.balance', 0) * -1,
                currency: get(invoice, 'data.currency', 0),
              }} />
            </p>
          </> :
          <>
            <div className="card mb-4">
              <div className="card-body">
                <div className="row mb-2 justify-content-between">
                  <div className="col col-auto"><FormattedMessage id="invoices.invoiceNo" /></div>
                  <div className="col col-auto"><strong>{get(invoice, 'data.invoice_number', 0)}</strong></div>
                </div>
                <div className="row mb-2 justify-content-between">
                  <div className="col col-auto"><FormattedMessage id="invoices.amount" /></div>
                  <div className="col col-auto"><strong>{get(invoice, 'data.total_amount', 0)}</strong></div>
                </div>
                <div className="row mb-2 justify-content-between">
                  <div className="col col-auto"><FormattedMessage id="invoices.paid" />:</div>
                  <div className="col col-auto"><strong>{get(invoice, 'data.total_amount', 0) - get(invoice, 'data.balance', 0)}</strong></div>
                </div>
                <div className="row justify-content-between">
                  <div className="col col-auto"><FormattedMessage id="invoices.excess" /></div>
                  <div className="col col-auto"><strong>{get(invoice, 'data.balance', 0) * -1}</strong></div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p><FormattedMessage id="invoices.followingCard" values={{
                balance: get(invoice, 'data.balance', 0) * -1,
                currency: get(invoice, 'data.currency', 0),
              }} /></p>
              <h5>{get(overpaid, 'data.cardno')}</h5>
            </div>
          </>
        }
        <Spinner show={overpaid.isLoading || invoice.isLoading} />
      </ModalBody>
      <ModalFooter className="justify-content-end">
        {
          isSuccess ?
          <button type="button" className="btn btn-success btn-block" onClick={onClose}>
            <FormattedMessage id="common.ok" />
          </button> :
          <>
            <button type="button" className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner className="btn btn-success" spin={isLoading} disabled={isLoading} onClick={onSubmit}>
              <FormattedMessage id="invoices.repayAmount" />
            </ButtonSpinner>
          </>
        }
      </ModalFooter>
    </Modal>
  )
}
