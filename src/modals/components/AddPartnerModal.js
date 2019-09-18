import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Modal, ModalBody, ModalHeader, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { connectFormResource } from 'common/utils/resource'
import { TextField } from 'common/forms/fields'
import Spinner from 'components/Spinner'
import { required, validateEmail } from 'validations'


class AddPartnerModal extends Component {
  onSubmit = (e) => {
    return this.props.onSubmit(e)
      .then(_ => toast.success(<FormattedMessage id={`toasters.partner.${this.props.id ? 'updated' : 'created'}`} />))
      .then(_ => this.props.onClose())
  }

  componentWillUnmount() {
    this.props.partner.setData(null)
  }

  render() {
    const { onClose, partner, handleSubmit } = this.props
    return (
      <Modal onClose={onClose}>
        <ModalHeader name={<FormattedMessage id="settings.addPartner" />} onClose={onClose} />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalBody>
            <Spinner show={partner.isLoading} />
            <div className="form-group">
              <TextField type="text" label={<FormattedMessage id="common.inputs.partnerEmail" />} name="email" validate={[ required, validateEmail ]} />
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-end">
            <button type="button" className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner className="btn btn-success" spin={partner.isLoading} disabled={partner.isLoading}>
              <FormattedMessage id="common.save" />
            </ButtonSpinner>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

export default compose(
  connectFormResource({
    namespace: 'partner',
    endpoint: 'profile/partners/:id?',
    idKey: 'id',
    list: true,
    async: true,
  }),
  reduxForm({
    form: 'partner'
  })
)(AddPartnerModal)
