import React from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import { TextField, SelectField } from 'common/forms/fields'
import { required } from 'validations'
import API from 'api'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { FontAwesomeIcon } from 'lib/font-awesome'


export class AddAttributeForm extends React.Component {
  state = {
    showForm: false,
  }

  showFormTrigger = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  resetForm = () => {
    this.props.reset('addAttribute')
    this.showFormTrigger()
  }

  onSubmit = (e) => {
    return API(`attributes`).post(e)
      .then(_ => this.props.attributes.fetch())
      .then(_ => this.props.reset('addAttribute'))
      .then(_ => this.props.onClose && this.props.onClose())
  }

  render() {
    if(this.props.addAttributeModal) return (
      <Modal onClose={ this.props.onClose }>
        <ModalHeader name={<FormattedMessage id="attributes.addAttributeBtn" />} onClose={this.props.onClose} />
        <ModalBody>
          <div className="form-group" >
            <TextField name="name" label="Name" validate={[ required ]}/>
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <button type="button" className="btn btn-link mr-2" onClick={this.props.onClose}>
            <FormattedMessage id="common.cancel" />
          </button>
          <ButtonSpinner
            className="btn btn-success"
            spin={this.props.attributes.isLoading}
            disabled={this.props.attributes.isLoading}
            onClick={this.props.handleSubmit(this.onSubmit)}
          >
            <FormattedMessage id="common.save" />
          </ButtonSpinner>
        </ModalFooter>
      </Modal>
    )
    return (
      <>
      {
        this.state.showForm &&
        <>
          <div className="input-group mb-3 mt-4">
            <div className="col p-0">
              <TextField name="name" placeholder="Enter new attribute name..." />
            </div>
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button" onClick={this.props.handleSubmit(this.onSubmit)} disabled={this.props.pristine}>
                <FormattedMessage id="attributes.addAttributeBtn" />
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={this.resetForm}><FontAwesomeIcon icon="times" /></button>
            </div>
          </div>
        </>
      }
        <div className="mb-4">
          <button type="button" className="btn-link small font-weight-bold pointer" onClick={this.showFormTrigger}><FontAwesomeIcon className="text-success mr-1" icon="plus" /> <FormattedMessage id="contacts.addAttribute" /></button>
        </div>
      </>
    )
  }
}

export default compose(
  reduxForm({
    form: 'addAttribute',
  })
)(AddAttributeForm)

