import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const IndexPage = () => (
  <div className="container">
    <div className="row mb-4">
      <div className="col">
        <h1><FormattedMessage id="contacts.import.title" /></h1>
        <p><FormattedMessage id="contacts.import.description" /></p>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <div className="card text-center">
          <img
            width="30%"
            className="mx-auto d-block mt-4 mb-3"
            src="/img/photocopy.svg"
            alt="Card cap"
          />
          <div className="card-body">
            <h3 className="card-title"><FormattedMessage id="contacts.copy.title" /></h3>
            <p className="card-text"><FormattedMessage id="contacts.import.copyDescription" /></p>
            <Link to="/contacts/import/text" className="btn btn-success">
              <FormattedMessage id="contacts.import.importNow" />
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card text-center">
          <img
            width="38.5%"
            className="mx-auto d-block mt-4 mb-3"
            src="/img/image_upload.svg"
            alt="Card cap"
          />
          <div className="card-body">
            <h3 className="card-title"><FormattedMessage id="contacts.file.title" /></h3>
            <p className="card-text"><FormattedMessage id="contacts.import.fileDescription" /></p>
            <Link to="/contacts/import/file" className="btn btn-success">
              <FormattedMessage id="contacts.import.importNow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default IndexPage;
