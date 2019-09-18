import React from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'


export default function SendMail(props) {
  const id = get(props, 'match.params.id')
  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <h1><FormattedMessage id="mails.sendMail" /></h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card-deck">
            <div className="card text-center">
              <div className="card-body">
                <img
                  width="70%"
                  className="mx-auto d-block mb-3"
                  src="/img/qa.svg"
                  alt="Card cap"
                />
                <h3 className="card-title"><FormattedMessage id="mails.sendOutATestMail" /></h3>
                <p className="card-text"><FormattedMessage id="mails.getYourMail" /></p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <Link to={`/mails/drafts/send/${id}/test`} className="btn btn-success mb-3">
                  <FormattedMessage id="common.select" />
                </Link>
              </div>
            </div>
            <div className="card text-center">
              <div className="card-body">
                <img
                  width="70%"
                  className="mx-auto d-block mb-3"
                  src="/img/newsletter.svg"
                  alt="Card cap"
                />
                <h3 className="card-title"><FormattedMessage id="mails.sendOutANewsletter" /></h3>
                <p className="card-text"><FormattedMessage id="mails.sendTheMail" /></p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <Link to={`/mails/drafts/send/${id}/now`} className="btn btn-success mb-3">
                  <FormattedMessage id="common.select" />
                </Link>
              </div>
            </div>
            <div className="card text-center">
              <div className="card-body">
                <img
                  width="70%"
                  className="mx-auto d-block mb-3"
                  src="/img/clock.svg"
                  alt="Card cap"
                />
                <h3 className="card-title"><FormattedMessage id="mails.scheduleANewsletter" /></h3>
                <p className="card-text"><FormattedMessage id="mails.scheduleTheMail" /></p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <Link to={`/mails/drafts/send/${id}/later`} className="btn btn-success mb-3">
                  <FormattedMessage id="common.select" />
                </Link>
              </div>
            </div>
            <div className="card text-center">
              <div className="card-body">
                <img
                  width="70%"
                  className="mx-auto d-block mb-3"
                  src="/img/phone.svg"
                  alt="Card cap"
                />
                <h3 className="card-title"><FormattedMessage id="mails.startAutoresponder" /></h3>
                <p className="card-text"><FormattedMessage id="mails.sendOutTheMail" /></p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <Link to={`/responders/start/${id}`} className="btn btn-success mb-3">
                  <FormattedMessage id="common.select" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
