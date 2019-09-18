import React, { Component } from 'react'
import { Redirect } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'
import { logout } from 'common/session'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Modal, ModalBody, ModalHeader, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { connectResource } from 'common/utils/resource'


class DeleteAccountModal extends Component {
  state = {
    confirm: false,
  }

  confirmDelete = (e) => {
    this.setState({ confirm: !this.state.confirm })
  }

  deleteAccount = () => {
    this.props.deleteAccount.remove({ reason: this.props.reason })
      .then(_ => this.props.onClose())
      .then(_ => {
        this.props.logout()
        this.props.user.setData(null)
        this.props.profile.setData(null)
      })
  }

  render() {
    const { deleteAccount, onClose } = this.props
    return (
      <Modal onClose={onClose}>
        <ModalHeader name={<FormattedMessage id="modalDeleteAccount.deleteHeader" />} onClose={onClose} />
        <ModalBody className="text-center">
          <h3><FormattedMessage id="modalDeleteAccount.text1" /></h3>
          <p><FormattedMessage id="modalDeleteAccount.text2" /></p>
          <p><strong><FormattedMessage id="modalDeleteAccount.text3" /></strong></p>
          <div className="custom-control custom-checkbox mt-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="confirmDelete"
              onChange={this.confirmDelete}
              value={this.state.confirm}
              checked={this.state.confirm}
            />
            <label className="custom-control-label" htmlFor="confirmDelete">
              <FormattedMessage id="modalDeleteAccount.confirm" />
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-link mr-2" onClick={onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
          <ButtonSpinner className="btn btn-danger" onClick={this.deleteAccount} disabled={deleteAccount.isLoading || !this.state.confirm}>
            <FormattedMessage id="modalDeleteAccount.deleteButton" />
          </ButtonSpinner>
        </ModalFooter>
      </Modal>
    )
  }
}

export default compose(
  connectResource({
    namespace: 'deleteAccount',
    endpoint: 'profile',
  }),
  connectResource({
    namespace: 'user',
    endpoint: 'user',
    async: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    async: true,
    prefetch: false,
  }),
  connect(null, ({ logout })),
)
(DeleteAccountModal)
