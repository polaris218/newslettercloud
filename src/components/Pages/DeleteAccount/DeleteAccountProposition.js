import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import DeleteAccountModal from 'modals/components/DeleteAccountModal'
import ModalTrigger from 'modals/ModalTrigger'


export default function DeleteAccountProposition({ component: Component, label, id }) {
  return (
    <div className="row mb-4">
      <div className="col-8 offset-2">
        <div className="card mb-4">
          <div className="card-body p-5">
            <h3 className="card-title">"{label}"</h3>
            <Component />
            <div className="row pt-4">
              <div className="col">
                <Link to="/account" className="btn btn-light"><FormattedMessage id="deleteAccount.links.keep" /></Link>
              </div>
              <div className="col text-right">
                {
                  id === 'competitor-reason' &&
                  <Link to="/contact" className="btn btn-light mr-2"><FormattedMessage id="deleteAccount.links.give" /></Link>
                }
                {
                  id === 'company-reason' &&
                  <Link to="/account" className="btn btn-light mr-2"><FormattedMessage id="deleteAccount.links.pause" /></Link>
                }
                <ModalTrigger component={DeleteAccountModal} reason={id}>
                  <button className="btn btn-danger"><FormattedMessage id="deleteAccount.links.delete" /></button>
                </ModalTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
