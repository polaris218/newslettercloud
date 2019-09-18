import React, { Component } from 'react'
import { reduxForm, getFormValues, change } from 'redux-form'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { get } from 'lodash'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal'
import { connectFormResource, connectResource } from 'common/utils/resource'
import { TextField, SelectField } from 'common/forms/fields'
import { required, validateEmail } from 'validations'
import ButtonSpinner from 'components/ButtonSpinner'
import {AttributesForm}  from 'common/widgets'
import { generateListOptionsObject } from 'common/utils/helpers'
import { FontAwesomeIcon } from 'lib/font-awesome'
import API from 'api'


class AddListModal extends Component {

  onSubmit = (data) => {
    return this.props.addContact.create(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.contact.added" />))
      .then(_ => this.props.onClose())
  }

  onCreateList = (value) => {
    return API('lists').post({ name: value })
    .then(resp => {
      this.props.change('lists', [...this.props.formLists, {hash: resp.hash, name: resp.name}])
    })
    .then(_ => this.props.lists.fetch())
  }

  componentWillUnmount() {
    this.props.addContact.setData(null)
  }

  render() {
    const { onClose, handleSubmit, lists } = this.props
    return (
      <Modal onClose={ onClose }>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalHeader name={<FormattedMessage id="contacts.addContact.title" />}  onClose={onClose} />
          <ModalBody>
            <div className="form-group">
              <TextField name="email" label={ <FormattedMessage id="common.inputs.email" />} required validate={[ required, validateEmail ]} />
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <TextField name="first_name" label={ <FormattedMessage id="common.inputs.firstName" />}/>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <TextField name="last_name" label={ <FormattedMessage id="common.inputs.lastName" />}/>
                </div>
              </div>
            </div>
            <AttributesForm/>
            <div className="mt-2">
              <h5><FormattedMessage id="contacts.addContact.addSubscriptions" /></h5>
              <SelectField
                name="lists"
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value.hash}
                options={generateListOptionsObject(lists.data)}
                isMulti={true}
                maxMenuHeight={300}
                isSearchable={true}
                closeMenuOnSelect={false}
                className="react-select"
                valueKey="hash"
                disabled={lists.isLoading || !lists.data}
                isLoading={lists.isLoading || !lists.data}
                arrStructure={true}
                placeholder={<FormattedMessage id="contacts.addContact.addSubscriptionsSelectPlaceholder" />}
                onCreateOption={this.onCreateList}
              />
              <small className="form-text text-muted"><FormattedMessage id="contacts.addContact.addSubscriptionsSelectHelper" /></small>
            </div>
          </ModalBody>
          <ModalFooter className="">
            <button type="button" className="btn btn-link mr-2" onClick={onClose}>
              <FormattedMessage id="common.cancel" />
            </button>
            <ButtonSpinner
              type="submit"
              className="btn btn-success"
              spin={lists.isLoading}
              disabled={lists.isLoading}
            >
              <FormattedMessage id="common.save" />
            </ButtonSpinner>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  change: (name, value) => dispatch(change('addContact', name, value)),
})

export default compose(
  connect((state) => ({
    formLists: get(getFormValues('addContact')(state), 'lists', []),
  }), mapDispatchToProps),
  connectFormResource({
    namespace: 'addContact',
    endpoint: 'contacts',
    prefetch: false,
  }),
  connectResource({
    namespace: 'lists',
    endpoint: 'lists',
    list: true,
    async: true,
  }),
  reduxForm({
    form: 'addContact'
  })
)(AddListModal)
