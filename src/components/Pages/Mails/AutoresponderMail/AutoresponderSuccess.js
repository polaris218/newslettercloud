import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { formatSendAfter } from 'common/utils/helpers'



export default function AutoresponderSuccess({ responders, sender }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card text-center">
            <div className="card-body p-5">
              <div className="row">
                <div className="col-10 offset-1">
                  <img width="15%" className="mx-auto d-block mb-4" src="/img/phone.svg" />
                  <h2 className="card-title"><FormattedMessage id="mails.yourAutoresponderHasNowStarted" /></h2>
                  <p className="card-text mb-4">
                    <FormattedMessage id="mails.yourAutoresponderHasNowStartedDescription" />
                  </p>
                  <div className="card-group mb-4">
                    <div className="card">
                      <div className="card-body text-center bg-light">
                        <p className="small mb-0"><FormattedMessage id="mails.sendingToList" />:</p>
                        <h5 className="card-title">{responders.list.name}</h5>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body text-center bg-light">
                        <p className="small mb-0"><FormattedMessage id="common.sender" />:</p>
                        <h5 className="card-title">{sender[0]}<br />{sender[1]}</h5>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body text-center bg-light">
                        <p className="small mb-0"><FormattedMessage id="common.time" />:</p>
                        <h5 className="card-title mb-1">{formatSendAfter(responders.time_to_send)}</h5>
                        <p className="small"><FormattedMessage id="mails.afterTheSubscription" /></p>
                      </div>
                    </div>
                  </div>
                  <p className="card-text text-center">
                    <FormattedMessage id="mails.noteThatOnlyContacts" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
