import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { CheckboxField, XlsParserField } from 'common/forms/fields'
import { required } from 'validations'
import ConnectFields from './ConnectFields'
import Success from './Success'
import Summary from './Summary'
import ListSelect from 'components/ListSelect'
import Spinner from 'components/Spinner'


const ImportFromFile = (props) => {
  if(props.finishImport) {
    return (
      <div className="container">
        <Success/>
      </div>
    )
  }
  if(props.viewSummary) {
    return(
      <div className="container">
        <Summary data={get(props.files, 'data')} />
      </div>
    )
  }
  return (
    <div className="container relative">
      <Spinner show={props.files.isLoading} />
      <div className="row mb-4 justify-content-center">
        <div className="col-8">
          <h1><FormattedMessage id="contacts.file.title" /></h1>
          <p><FormattedMessage id="contacts.file.description" /></p>
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
                <h5 className="card-title mb-0">2. <FormattedMessage id="contacts.file.uploadYourFile" /></h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <FormattedMessage id="contacts.file.uploadYourFileDescription" />
                </p>
                <div className="form-group">
                  <XlsParserField name="file" required validate={[ required ]} />
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
              <ConnectFields connectOptions={props.file.options} attributes={props.attributes} />
            }
            <div className="d-flex justify-content-end">
              {
                props.connectFieldsView &&
                <button type="button" className="btn btn-link mr-2" onClick={props.onCancel}><FormattedMessage id="common.cancel" /></button>
              }
              <button className="btn btn-success"><FormattedMessage id="common.continue" /></button>
            </div>


          </div>
        </div>
      </form>
    </div>
  );
};

export default ImportFromFile
