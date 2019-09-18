import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import { connectFormResource } from 'common/utils/resource'
import { TextField, TextareaField } from 'common/forms/fields'
import { required } from 'validations'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'


class AddListModal extends Component {
  onSubmit = (e) => {
    return this.props.onSubmit(e)
      .then(_ => toast.success(<FormattedMessage id={`toasters.list.${this.props.id ? 'updated' : 'created'}`} />))
      .then(_ => this.props.onClose())
  }

  componentWillUnmount() {
    this.props.list.setData(null)
  }

  render() {
    const { onClose, handleSubmit, list, modalHeader = <FormattedMessage id="listModal.add" /> } = this.props
    return (
      <Modal onClose={ onClose }>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalHeader name={modalHeader} onClose={onClose} />
          <ModalBody>
            <Spinner show={list.isLoading} />
            <div className="form-group">
              <TextField name="name" label={ <FormattedMessage id="common.inputs.name" />} required validate={[ required ]} />
            </div>
            <div className="form-group">
              <TextareaField name="description" label={ <FormattedMessage id="common.inputs.description" />} rows="4" />
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-end">

            <button type="button" className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner
              type="submit"
              className="btn btn-success"
              spin={list.isLoading}
              disabled={list.isLoading}
            >
              <FormattedMessage id="common.saveAndReturn" />
            </ButtonSpinner>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

export default compose(
  connectFormResource({
    namespace: 'list',
    endpoint: 'lists',
    list: true,
    idKey: 'id',
    async: true,
  }),
  reduxForm({
    form: 'list'
  })
)(AddListModal)