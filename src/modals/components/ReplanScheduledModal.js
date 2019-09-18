import React, { Component } from 'react';
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'

import { connectFormResource } from 'common/utils/resource'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'
import { DateTimeField } from 'common/forms/fields'
import API from 'api'


class ReplanScheduledModal extends Component {
  onSubmit = (e) => {
    return API(`mails/scheduled/${e.id}/replan`).post(e)
      .then(_ => this.props.onClose())
  }

  componentWillUnmount() {
    this.props.scheduled.setData(null)
  }

  render() {
    const { onClose, scheduled, handleSubmit } = this.props
    return (
      <Modal onClose={onClose}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalHeader name={<FormattedMessage id="modalReplanScheduled.modalTitle" />} onClose={onClose} />
          <ModalBody>
            <Spinner show={scheduled.isLoading} />
            <div className="form-group mb-0">
              <p><FormattedMessage id="modalReplanScheduled.modalText" /></p>
              <DateTimeField name="time_to_send" label={<FormattedMessage id="common.inputs.timeAndDate" />} />
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-end">
            <button className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner
              type="submit"
              className="btn btn-success"
              spin={scheduled.isLoading}
              disabled={scheduled.isLoading}
            >
              <FormattedMessage id="common.replan" />
            </ButtonSpinner>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default compose(
  connectFormResource({
    namespace: 'scheduled',
    endpoint: 'mails/scheduled/:id?',
    idKey: 'id',
    list: true,
    async: true,
  }),
  reduxForm({
    form: 'scheduled',
  })
)(ReplanScheduledModal)
