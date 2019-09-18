import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'

import 'common/utils/detectizr'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import { connectFormResource } from 'common/utils/resource'
import { TextField, TextareaField } from 'common/forms/fields'
import { required } from 'validations'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'


class FeedBackModal extends Component {

  onSubmit = (e) => {
    return this.props.onSubmit({
      ...e,
      url: window.location.href,
      browser: window.Detectizr.browser,
      os: window.Detectizr.os,
    })
      .then(_ => this.props.onClose())
      .then(_ => this.props.history.push({
        state: { openFeedback: false },
      }))
      .then(_ => toast.success(<FormattedMessage id="toasters.feedback.sent" />))
  }


  componentWillUnmount() {
    this.props.feedback.setData(null)
  }

  render() {
    const { onClose, handleSubmit, feedback } = this.props
    return (
      <Modal onClose={ onClose }>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalHeader name={<FormattedMessage id="feedback.modal.header" />} onClose={onClose} />
          <ModalBody>
            <Spinner show={feedback.isLoading} />
            <p className="mt-2 mb-4"><FormattedMessage id="feedback.modal.text" /></p>
            <div className="form-group">
              <TextField name="email" label={ <FormattedMessage id="common.yourEmail" />} required validate={[ required ]} />
            </div>
            <div className="form-group">
              <TextareaField name="description" label={ <FormattedMessage id="common.description" />} required validate={[ required ]} rows="4" />
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-end">
            <button type="button" className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner
              type="submit"
              className="btn btn-success"
              spin={feedback.isLoading}
              disabled={feedback.isLoading}
            >
              <FormattedMessage id="common.send" />
            </ButtonSpinner>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

export default compose(
  withRouter,
  connectFormResource({
    namespace: 'feedback',
    endpoint: 'report_bug',
    prefetch: false,
  }),
  reduxForm({
    form: 'feedback',
  })
)(FeedBackModal)
