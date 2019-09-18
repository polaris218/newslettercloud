import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


const Summary = ({ data: { summary, errors_count, errors_file }, noFooter }) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 mb-3">
          <div className="card mb-4">
            <div className="row justify-content-center text-center">
              <div className="col-8">
                <div className="card-body p-5">
                  <img width="25%" className="mx-auto d-block mb-4" src="/img/photocopy.svg" />
                  <h2 className="mb-4" className="card-title"><FormattedMessage id="contacts.summary.title" /></h2>
                  <p className="mb-5 card-text">
                    <FormattedMessage id="contacts.summary.description" />
                  </p>
                  <div className="row">
                    <div className="col-4">
                      <p className="mb-1 small"><FormattedMessage id="contacts.summary.newContacts" /></p>
                      <h2>{summary['created contacts'] || summary['contacts created'] || 0}</h2>
                    </div>
                    <div className="col-4">
                      <p className="mb-1 small"><FormattedMessage id="contacts.summary.updatedContacts" /></p>
                      <h2>{summary['updated contacts'] || summary['contacts updated'] || 0}</h2>
                    </div>
                    <div className="col-4">
                      <p className="mb-1 small"><FormattedMessage id="contacts.summary.newSubscriptions" /></p>
                      <h2>{summary['created subscriptions'] || summary['subscriptions created'] || 0}</h2>
                    </div>
                    <div className="col-12">
                      {
                        errors_count &&
                        <div>
                          <hr/>
                          <div><small><FormattedMessage id="importContacts.summary.errorsCount" values={{ count: errors_count }} /></small></div>
                          <a className="text-danger link-underline" href={errors_file}><FormattedMessage id="importContacts.summary.errorsLink" /></a>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!noFooter && <div className="col-8 d-flex justify-content-center">
          <Link to="/contacts" className="btn btn-outline-secondary mr-4"><FormattedMessage id="common.goToContacts" /></Link>
          <Link to="/mails/drafts/new" className="btn btn-success"><FormattedMessage id="common.createNewEmail" /></Link>
        </div>}
      </div>
    </>
  )
}

export default Summary
