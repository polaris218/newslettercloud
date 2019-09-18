import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { Modal, ModalBody, ModalFooter } from 'components/Modal';
import ButtonSpinner from 'components/ButtonSpinner';
import serviceStatus from 'services/status';


const propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}


export default class ModalConfirmationWrapper extends Component {
  state = {
    validated: false,
    status: serviceStatus.OK,
    additional: false,
  };

  onConfirm = event => {
    event.preventDefault()
    this.props.onConfirm()
    if(this.state.additional) {
      this.props.checkboxAction()
    }
    this.props.onClose()
  }

  onAdditionalConfirm = event => {
    this.setState({ additional: !this.state.additional })
  }

  render() {
    const { open, onClose, message, checkboxAction, checkboxActionText, confirmBtn, isPositive } = this.props
    const { status, additional } = this.state;
    if(!open) return null
    return (
      <Modal onClose={onClose} className="confirmation-modal">
        <ModalBody>
          <p className="lead">
            {message}
          </p>
          {
            checkboxAction &&
            <div className="custom-control custom-checkbox mt-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="additional"
                onChange={this.onAdditionalConfirm}
                value={additional}
                checked={additional}
              />
              <label className="custom-control-label" htmlFor="additional">
                {checkboxActionText}
              </label>
            </div>
          }
        </ModalBody>
        <ModalFooter className="flex-column align-items-stretch">
          <ButtonSpinner
            className={`btn btn-${isPositive ? 'success' : 'danger'} mr-0 mb-3`}
            spin={status === serviceStatus.LOADING}
            disabled={status === serviceStatus.LOADING}
            onClick={this.onConfirm}
          >
          {confirmBtn || <FormattedMessage id="common.delete" />}
          </ButtonSpinner>
          <button className="btn btn-outline-secondary ml-0" onClick={this.props.onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}

ModalConfirmationWrapper.propTypes = propTypes
