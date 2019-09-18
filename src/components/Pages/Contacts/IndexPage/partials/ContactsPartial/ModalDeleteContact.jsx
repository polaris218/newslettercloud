import React from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Modal, ModalBody, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { connectResource } from 'common/utils/resource'


function ModalDeleteContact({ contacts, ...props }) {

  return (
    <Modal onClose={props.onClose} className="confirmation-modal">
      <form onSubmit={props.onSubmit}>
        <ModalBody>
          <p className="lead">
            <FormattedMessage id="contacts.delete.areYouSure" values={{ count: props.count }} />
          </p>
        </ModalBody>
        <ModalFooter className="flex-column align-items-stretch">
          <ButtonSpinner
            type="button"
            className="btn btn-danger mr-0 mb-3"
            spin={props.isLoading}
            disabled={props.isLoading}
            onClick={(ev) => {
              ev.preventDefault()
              return props.deleteContacts.create({ contacts })
                .then(_ => toast.success(<FormattedMessage id="toasters.contact.deleted" />))
                .then(_ => {
                  props.onClose()
                  props.callBack()
                })
            }}
          >
            <FormattedMessage id="common.delete" />
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
  namespace: 'deleteContacts',
  endpoint: 'contacts/delete',
  prefetch: false,
})(ModalDeleteContact)
