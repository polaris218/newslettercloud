import React from 'react'
import { FormattedMessage } from 'react-intl'

import { CheckboxField, TextareaField } from 'common/forms/fields'
import { required } from 'validations'
import ConnectFields from './ConnectFields'
import Summary from './Summary'
import ListSelect from 'components/ListSelect'


const ImportFromText = (props) => {
  if(props.summary) return (<div className="container">
    <Summary data={{ summary: props.summary }} />
  </div>)
  return (
    <div className="container">
      <div className="row mb-4 justify-content-center">
        <div className="col-8">
          <h1><FormattedMessage id="contacts.copy.title" /></h1>
          <p><FormattedMessage id="contacts.copy.description" /></p>
        </div>
      </div>

      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row justify-content-center">
          <div className="col-8">
          <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">1. <FormattedMessage id="contacts.file.chooseList" /></h5>
              </div>
              <div className="card-body">
                <p className="card-text"><FormattedMessage id="contacts.file.chooseFileDescription" /></p>
                <ListSelect name="lists" arrayValue={true} isSearchable={true} label={<FormattedMessage id="common.inputs.chooseLists" />} required validate={[required]} />
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">2. <FormattedMessage id="contacts.copy.pasteContacts" /></h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <FormattedMessage id="contacts.copy.pasteContactsDescription" />
                </p>
                <div className="form-group">
                  <TextareaField
                    label={<FormattedMessage id="contacts.copy.pasteContacts" />}
                    name="items"
                    disabled={props.connectFieldsView}
                    rows="5"
                    required
                    validate={[ required ]}
                  />
                </div>
                  <CheckboxField
                    name="updateContact"
                    boxLabel={<FormattedMessage id="contacts.file.existingContact" />}
                    description={<FormattedMessage id="contacts.file.updateContact" />}
                  />
              </div>
            </div>
            {
              props.connectFieldsView &&
              <ConnectFields connectOptions={props.connectOptions} attributes={props.attributes} />
            }
            <div className="d-flex justify-content-end">
              {
                props.connectFieldsView && !props.summary &&
                <button type="button" className="btn btn-link mr-2" onClick={props.onCancel}><FormattedMessage id="common.cancel" /></button>
              }
              {
                !props.summary &&
                <button className="btn btn-success"><FormattedMessage id="common.continue" /></button>
              }
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImportFromText
