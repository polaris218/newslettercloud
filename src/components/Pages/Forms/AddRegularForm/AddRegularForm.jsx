import React from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { TextField, CheckboxField, TextareaField } from 'common/forms/fields'
import { validateEmail, validateUrl, required } from 'validations'
import ButtonSpinner from 'components/ButtonSpinner'
import ListSelect from 'components/ListSelect'
import { PageTitle } from 'common/widgets'


const AddRegularForm = (props) => {
  let number = 0
  return (
    <div className="container">
      <PageTitle title="title.regularForm"/>
      <div className="row mb-4">
        <div className="col-8 offset-2">
          <h1><FormattedMessage id="addForm.regularForm" /></h1>
          <p>
            <FormattedMessage id="addForm.regularForm.description" />
          </p>
        </div>
      </div>

      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row">
          <div className="col-8 offset-2">
            {
              props.id &&
              <div className="card mb-4" id="use_subscription_form">
                <h3 className="card-header h5"><FormattedMessage id="addForm.regularForm.use" /></h3>
                <div className="card-body">
                  <p className="card-text">
                    <FormattedMessage id="addForm.regularForm.copy" />
                  </p>
                  <div className='form-group'>
                    <TextareaField name="form" rows="10" disabled={true} label={<FormattedMessage id="common.inputs.copyFormBelow" />} />
                  </div>
                  <h3 className="card-title h5"><FormattedMessage id="addForm.regularForm.useLink" /></h3>
                  <p className="card-text text-muted">
                    <FormattedMessage id="addForm.regularForm.copy2" />
                  </p>
                  <div className='form-group'>
                    <TextareaField name="form_link" rows="1" disabled={true} label={<FormattedMessage id="common.inputs.copyLinkBelow" />} />
                  </div>
                </div>
              </div>
            }
            <div className="card mb-4">
              <h3 className="card-header h5">{++number}. <FormattedMessage id="addForm.regularForm.nameForm" /></h3>
              <div className="card-body">
                <p className="card-text">
                  <FormattedMessage id="addForm.regularForm.nameFormText" />
                </p>
                <div className='form-group'>
                  <TextField name="name" placeholder="My awesome form..." label={<FormattedMessage id="common.inputs.name" />} required validate={[ required ]} />
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <h3 className="card-header h5">{++number}. <FormattedMessage id="addForm.regularForm.contactFields" /></h3>
              <div className="card-body">
                <p className="card-text">
                  <FormattedMessage id="addForm.regularForm.contactFieldsText" />
                </p>
                <div className='form-group'>
                  <CheckboxField name="default" boxLabel={<FormattedMessage id="common.inputs.email" />} disabled={true} checked={true} />
                  <CheckboxField name="first_name" boxLabel={<FormattedMessage id="common.inputs.firstName" />} />
                  <CheckboxField name="last_name" boxLabel={<FormattedMessage id="common.inputs.lastName" />} />
                </div>
              </div>
            </div>
            {
              !!get(props.attributes, 'data.length') &&
              <div className="card mb-4" id="attributes">
                <h3 className="card-header h5">{++number}. <FormattedMessage id="addForm.regularForm.attributeFields" /></h3>
                <div className="card-body">
                  <p className="card-text">
                    <FormattedMessage id="addForm.regularForm.attributeFieldsText" />
                  </p>
                  <div className='form-group'>
                    {
                      props.attributes.data.map((i, index) => (
                        <CheckboxField key={i.code} name={`attributes.${i.code}`} boxLabel={i.name} />
                      ))
                    }
                  </div>
                </div>
              </div>
              }
            <div className="card mb-4">
              <h3 className="card-header h5">{++number}. <FormattedMessage id="addForm.regularForm.listAndSender" /></h3>
              <div className="card-body">
                <div className="form-group mb-0">
                  <ListSelect name="lists" arrayValue={true} isSearchable={true} label={<FormattedMessage id="common.inputs.chooseLists" />} required validate={[required]} />
                  <div className="row mt-3 mb-3">
                    <div className="col">
                      <TextField name="sender" placeholder="John" label={<FormattedMessage id="common.inputs.senderName" />} required validate={[ required ]} />
                    </div>
                    <div className="col">
                      <TextField name="email" placeholder="example@mail.com" label={<FormattedMessage id="common.inputs.senderEmail" />} required validate={[ required, validateEmail ]} />
                    </div>
                  </div>
                  {
                    !props.advanced && <a href="/link" onClick={props.showAdvancedSettings} id="advanced-trigger"><FormattedMessage id="addForm.regularForm.showAdvancedSettings" /></a>
                  }
                </div>
              </div>
            </div>
            {
              props.advanced &&
              <>
                <div className="card mb-4" id="advanced">
                  <h3 className="card-header h5">{++number}. <FormattedMessage id="addForm.regularForm.confirmationEmail" /></h3>
                  <div className="card-body">
                    <p className="card-text">
                      <FormattedMessage id="addForm.regularForm.confirmationEmailText" />
                    </p>
                    <div className="form-group">
                      <TextField name="verify_mail_subject" label={<FormattedMessage id="common.inputs.subject" />} />
                    </div>
                    <div className="form-group">
                      <TextareaField name="verify_mail_text" rows="6" label={<FormattedMessage id="common.inputs.message" />} />
                    </div>
                  </div>
                </div>
                <div className="card mb-4">
                  <h3 className="card-header h5">{++number}. <FormattedMessage id="addForm.regularForm.formSettings" /></h3>
                  <div className="card-body">
                    <p className="card-text">
                      <FormattedMessage id="addForm.regularForm.formSettingsText" />
                    </p>
                    <div className="form-group mb-0">
                      <div className="row mt-3">
                        <div className="col">
                          <TextField name="next_url" label={<FormattedMessage id="common.inputs.nextUrl" />} placeholder="http://example.com" validate={[ validateUrl ]} />
                        </div>
                        <div className="col">
                          <TextField name="button_text" label={<FormattedMessage id="common.inputs.buttonText" />} placeholder="Submit" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
            <div className="d-flex justify-content-end">
              <Link to="/forms" className="btn btn-link mr-2"><FormattedMessage id="common.cancel" /></Link>
              <ButtonSpinner
                type="submit"
                className="btn btn-success"
                spin={!!props.forms.loading}
                disabled={!!props.forms.loading}
              >
                {props.id ? <FormattedMessage id="addForm.regularForm.updateForm" /> : <FormattedMessage id="addForm.regularForm.createForm" />}
              </ButtonSpinner>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRegularForm
