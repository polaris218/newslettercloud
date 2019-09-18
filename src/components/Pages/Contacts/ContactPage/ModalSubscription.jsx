import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalBody, ModalHeader, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { connectResource } from 'common/utils/resource'


export default function ModalSubscription({ contacts, change, ...props }) {
  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={props.onSubmit}>
        <ModalHeader
          name={<FormattedMessage id="common.areYouSure"/>}
          onClose={props.onClose}
        />
        <ModalBody>
          <p>
            { props.message }
          </p>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button type="button" className="btn btn-link mr-2" onClick={props.onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
          <ButtonSpinner
            type="button"
            className="btn btn-success"
            spin={props.isLoading}
            disabled={props.isLoading}
            onClick={(e) => props.callback(e, props.onClose)}
          >
            Ok
          </ButtonSpinner>
        </ModalFooter>
      </form>
    </Modal>
  )
}
