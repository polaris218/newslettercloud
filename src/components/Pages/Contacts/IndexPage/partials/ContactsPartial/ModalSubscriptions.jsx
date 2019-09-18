import React from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Modal, ModalBody, ModalHeader, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { connectResource } from 'common/utils/resource'


function ModalDeleteContact({ contacts, lists, count, ...props }) {

  return (
    <Modal onClose={props.onClose} className="confirmation-modal">
      <form onSubmit={props.onSubmit}>
        <ModalBody>
          <p className="lead">
            <FormattedMessage id="contacts.subscribe.areYouSure" values={{ count }} />
          </p>
        </ModalBody>
        <ModalFooter className="flex-column align-items-stretch">
          <ButtonSpinner
            type="button"
            className="btn btn-success mr-0 mb-3"
            spin={props.isLoading}
            disabled={props.isLoading}
            onClick={(ev) => {
              ev.preventDefault()
              return props.subscribeContacts.create({ contacts, lists })
                .then(_ => toast.success(<FormattedMessage id="toasters.subscription.added" />))
                .then(_ => {
                  props.onClose()
                  props.callBack()
                })
            }}
          >
            <FormattedMessage id="contacts.modalHeader.addSubscriptions" values={{ count }} />
          </ButtonSpinner>
          <button type="button" className="btn btn-outline-secondary ml-0" onClick={props.onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
        </ModalFooter>
      </form>

    </Modal>
  )
}

export default connectResource({
  namespace: 'subscribeContacts',
  endpoint: 'contacts/subscribe',
  prefetch: false,
})(ModalDeleteContact)
