import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import { connectFormResource } from 'common/utils/resource'
import { TextField } from 'common/forms/fields'
import { required } from 'validations'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'


class ModalAddAttribute extends Component {
  onSubmit = (data) => {
    return this.props.onSubmit(data)
      .then(_ => toast.success(<FormattedMessage id={`toasters.attribute.${this.props.code ? 'updated' : 'created'}`} />))
      .then(_ => this.props.onClose())
  }

  componentWillUnmount() {
    this.props.attribute.setData(null)
  }

  render() {
    const { onClose, handleSubmit, attribute, code } = this.props
    return (
      <Modal onClose={ onClose }>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalHeader name={<FormattedMessage id={code ? 'contacts.attribute.edit' : 'contacts.attribute.title'} />}  onClose={onClose} />
          <ModalBody>
              <Spinner show={attribute.isLoading} />
              <div className="form-group">
                <TextField name="name" label={ <FormattedMessage id="common.inputs.name" />} required validate={[ required ]} />
              </div>
          </ModalBody>
          <ModalFooter className="justify-content-end">
            <button type="button" className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner
              type="submit"
              className="btn btn-success"
              spin={attribute.isLoading}
              disabled={attribute.isLoading}
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
    namespace: 'attribute',
    endpoint: 'attributes',
    list: true,
    idKey: 'code',
    async: true,
  }),
  reduxForm({
    form: 'addAttribute'
  })
)(ModalAddAttribute)
