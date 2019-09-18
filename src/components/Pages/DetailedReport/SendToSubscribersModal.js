import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import Spinner from 'components/Spinner'
import API from 'api'


export default class SendToSubscribersModal extends Component {
  state = {
    status: null,
    count: 0,
  }

  componentDidMount() {
    return API(`reports/${this.props.id}/send_to_new`).post({})
      .then(resp => {
        if(resp.status = 'SUCCESS') {
          this.setState({ status: 'OK', count: resp.task_data.sent_to })
        } else {
          this.setState({ status: 'ERROR' })
        }
      })
      .catch(_ => this.setState({ status: 'ERROR' }))
  }

  render() {
    const { onClose } = this.props
    const { count, status } = this.state
    return (
      <Modal className="confirmation-modal">
        <ModalBody>
          <h5><FormattedMessage id="reports.sendToSubscribers.btn" /></h5>
          {
            !status &&
            <>
              <div className="relative py-5">
                <Spinner show={true} />
              </div>
              <p>
                <FormattedMessage id="reports.sendToSubscribers.text" />
              </p>
            </>
          }
          {
            status === 'OK' &&
            <div className="alert alert-success"><FormattedMessage id="reports.sendToSubscribers.success" values={{ count }} /></div>
          }
          {
            status === 'ERROR' &&
            <div className="alert alert-danger"><FormattedMessage id="reports.sendToSubscribers.error" /></div>
          }
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button type="button" className="btn btn-secondary-outline btn-block" onClick={onClose}>
            <FormattedMessage id="common.close" />
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}
