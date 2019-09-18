import React from 'react'
import { FormattedMessage } from 'react-intl'

import { TextField } from 'common/forms/fields'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { required, validateEmail, maxLength255 } from 'validations'
import Spinner from 'components/Spinner'


export default function AddSenders({ onClose, handleSubmit, onSubmit, sender }) {
  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Spinner show={sender.isLoading} />
        <ModalHeader name={<FormattedMessage id="senders.addSender" />} onClose={onClose} />
        <ModalBody>
          <p><FormattedMessage id="senders.addSender.description" /></p>
          <div className='form-group'>
            <TextField name="name" label={<FormattedMessage id="common.inputs.name" />} validate={[ required, maxLength255 ]} required  />
          </div>
          <div className='form-group'>
            <TextField name="email" label={<FormattedMessage id="common.inputs.email" />} validate={[ required, validateEmail ]} required />
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button className="btn btn-link mr-2" onClick={onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
          <ButtonSpinner
            type="submit"
            className="btn btn-success"
            spin={sender.isLoading}
            disabled={sender.isLoading}
          >
            <FormattedMessage id="common.saveAndReturn" />
          </ButtonSpinner>
        </ModalFooter>
      </form>
    </Modal>
  )
}
