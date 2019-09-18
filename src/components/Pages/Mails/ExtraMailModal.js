import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import { connectResource } from 'common/utils/resource'


function ExtraMailModal() {
  const { onClose, buyExtraMails, upgradeAccount, extra_price, profile } = this.props
  return (
    <Modal onClose={ onClose }>
      <ModalHeader name="You don't have enough mails left on your account" onClose={onClose} />
      <ModalBody>
        <div className="text-center">
          <p>In order to start the sending you can either upgrade your account to the next level or<br/> buy <strong>100 mails</strong> for a total of <strong>{extra_price} {profile.data.currency_code}</strong>.</p>
          <p><small><strong>How you would like to proceed?</strong></small></p>
          <div className="row justify-content-center align-items-center">
            <div className="col col-auto">
              <button className="btn btn-secondary" onClick={buyExtraMails}>Buy extra mails</button>
            </div>
            <span>or</span>
            <div className="col col-auto">
              <button className="btn btn-success" onClick={upgradeAccount}>Upgrade your account</button>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <button type="button" className="btn btn-link" onClick={onClose}>
          <FormattedMessage id="common.cancel" />
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default connectResource({
  namespace: 'profile',
  endpoint: 'profile',
  prefetch: false
})(ExtraMailModal)
