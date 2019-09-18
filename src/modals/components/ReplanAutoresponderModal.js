import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalBody, ModalHeader, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { connectFormResource } from 'common/utils/resource'
import { TextField, SelectField } from 'common/forms/fields'
import { generateHours } from 'common/utils/helpers'
import Spinner from 'components/Spinner'
import CustomValidationError from 'components/CustomValidationError'


class ReplanAutoresponderModal extends Component {
  onSubmit = (e) => {
    const data = {
      list: e.list.hash,
      time_to_send: e.time_to_send,
    }

    return this.props.onSubmit(data)
      .then(_ => this.props.onClose())
      .catch(err => {
        if(err.errors.time_to_send) {
          toast.error(() => <CustomValidationError messages={err.errors.time_to_send} />)
        }

        throw err
      })
  }

  componentWillUnmount() {
    this.props.responder.setData(null)
  }

  render() {
    const { onClose, responder, handleSubmit } = this.props
    return (
      <Modal onClose={onClose}>
        <ModalHeader name={<FormattedMessage id="modalResponderAutoresponder.header" />} onClose={onClose} />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalBody className="text-center">
            <Spinner show={responder.isLoading} />
            <div className="row">
              <div className="col text-left">
                <TextField type="number" label={<FormattedMessage id="common.inputs.days" />} name="time_to_send.days" />
              </div>
              <div className="col text-left">
                <SelectField label={<FormattedMessage id="common.inputs.hours" />} name="time_to_send.hours" options={generateHours()} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner className="btn btn-success" spin={responder.isLoading} disabled={responder.isLoading}>
              <FormattedMessage id="common.schedule" />
            </ButtonSpinner>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

export default compose(
  connectFormResource({
    namespace: 'responder',
    endpoint: 'responders/:id?',
    idKey: 'id',
    list: true,
    async: true,
  }),
  reduxForm({
    form: 'responder'
  })
)(ReplanAutoresponderModal)
