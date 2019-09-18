import React from 'react'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl';

import { TextField, TextareaField } from 'common/forms/fields'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { required, maxLength255 } from 'validations'
import Spinner from 'components/Spinner'


export default function AddApiToken({ onClose, onSubmit, token, id }) {
  return (
    <Modal onClose={onClose}>
      <form onSubmit={onSubmit} noValidate>
        <ModalHeader name={<FormattedMessage id="apiTokens.addToken" />} onClose={onClose} />
        <ModalBody>
          {
            get(token, 'data.key') &&
            <div className="mb-2">
              <TextareaField name="key" rows="3" label="Copy token below" disabled />
            </div>
          }
          <div className='form-group'>
            <TextField name="name" label={<FormattedMessage id="common.inputs.name" />} validate={[ required, maxLength255 ]} required  />
          </div>
          <div className='form-group'>
            <TextField name="description" label={<FormattedMessage id="common.inputs.description" />} />
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button className="btn btn-link mr-2" onClick={onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
          <ButtonSpinner
            type="submit"
            className="btn btn-success"
            spin={token.isLoading}
            disabled={token.isLoading}
          >
            <FormattedMessage id={id ? 'common.saveAndReturn' : 'common.save'} />
          </ButtonSpinner>
        </ModalFooter>
        <Spinner show={token.isLoading} />
      </form>
    </Modal>
  )
}
