import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

import { Modal, ModalBody, ModalFooter } from 'components/Modal'
import API from 'api'


class RemoveReportModal extends Component {
  state = {
    additional: false,
  };

  onAdditionalConfirm = event => {
    this.setState({ additional: !this.state.additional })
  }

  removeReport = id => {
    let url = `reports/${id}`
    return API(url).delete({ delete_mail: this.state.additional })
      .then(_ => this.props.onClose())
      .then(_ => toast.success('Report deleted successfuly'))
      .then(_ => this.props.redirectToList && this.props.history.push('/reports'))

  }

  render() {
    const { onClose, id, name } = this.props
    return (
      <Modal onClose={onClose} className="confirmation-modal">
        <ModalBody>
          <FormattedMessage id="reports.delete" values={{ name }} />
          <div className="custom-control custom-checkbox mt-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="additional"
              onChange={this.onAdditionalConfirm}
              value={this.state.additional}
              checked={this.state.additional}
            />
            <label className="custom-control-label" htmlFor="additional">
              <FormattedMessage id="reports.matching" />
            </label>
          </div>
        </ModalBody>
        <ModalFooter className="flex-column align-items-stretch">
          <button
            className="btn btn-danger mr-0 mb-2"
            onClick={() => this.removeReport(id)}
          >
            <FormattedMessage id="common.delete" />
          </button>
          <button className="btn btn-outline-secondary ml-0" onClick={onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default withRouter(RemoveReportModal)
