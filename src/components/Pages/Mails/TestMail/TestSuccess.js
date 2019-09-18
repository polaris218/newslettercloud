import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


export default function TestSuccess(props) {
  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <h1><FormattedMessage id="mails.sendOutATestMail" /></h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card text-center">
            <div className="card-body p-5">
              <div className="row">
                <div className="col-10 offset-1">
                  <img width="15%" className="mx-auto d-block mb-4" src="/img/qa.svg" />
                  <h2 className="card-title mb-4"><FormattedMessage id="mails.yourTestMail" /></h2>
                  <p className="card-text mb-4">
                    <FormattedMessage id="mails.weHaveNowSent" /><br />
                    <FormattedMessage id="mails.CheckOutYourInbox" />
                  </p>
                  <div className="mb-4">
                    <Link to="/mails/drafts" className="btn btn-outline-secondary mr-3"><FormattedMessage id="mails.editMail" /></Link>
                    <Link to={`/mails/drafts/send/${props.id}/now`} className="btn btn-success"><FormattedMessage id="mails.sendMailBtn" /></Link>
                  </div>
                  <small>
                    <FormattedMessage id="mails.wait30Minutes" />
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
