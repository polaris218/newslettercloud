import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import omit from 'lodash/omit'
import { logout } from 'common/session'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import { TextField } from 'common/forms/fields'
import ButtonSpinner from 'components/ButtonSpinner'
import { required } from 'validations'


class ConfirmModal extends Component {
  onSubmit = (e) => {
    let request = e
    if(!e.new_password) {
      request = omit(request, ['new_password', 'confirm_new_password'])
    }
    return this.props.updateUser(request)
      .then(_ => toast.success(<FormattedMessage id="toasters.accountDetails.updated" />))
      .then(_ => this.props.toggleEditPassword(null, true))
      .then(_ => this.props.onClose())
      .then(_ => {
        if(e.new_password){
          this.props.logout()
          this.props.user.setData(null)
          this.props.profile.setData(null)
        }
      })
  }

  render() {
    const { isLoading, handleSubmit } = this.props

    return (
      <Modal onClose={this.props.onClose}>
        <ModalHeader name={<FormattedMessage id="profile.confirmModal.modalName" />} onClose={this.props.onClose} />
        <ModalBody>
          <p><FormattedMessage id="profile.confirmModal.title" /></p>
          <div className="form-group mb-4">
            <TextField name="password" type="password" label={<FormattedMessage id="profile.confirmModal.label" validate={[ required ]} required />} />
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button type="button" className="btn btn-link mr-2" onClick={this.props.onClose} disabled={isLoading}>
            <FormattedMessage id="common.cancel" />
          </button>
          <ButtonSpinner
            type="submit"
            className="btn btn-success"
            spin={isLoading}
            disabled={isLoading}
            onClick={handleSubmit(this.onSubmit)}
          >
            <FormattedMessage id="profile.confirmModal.button" />
          </ButtonSpinner>
        </ModalFooter>
      </Modal>
    );
  }
}

export default compose(
  connect(null, ({ logout })),
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
)
(ConfirmModal)
