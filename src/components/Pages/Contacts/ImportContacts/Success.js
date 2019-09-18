
import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


const Success = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card text-center">
            <div className="card-body p-5">
              <div className="row justify-content-center">
                <div className="col-8">
                  <img width="25%" className="mx-auto d-block mb-4" src="/img/image_upload.svg" />
                  <h2 className="card-title mb-4"><FormattedMessage id="contacts.success.title" /></h2>
                  <p className="card-text mb-4">
                    <FormattedMessage id="contacts.success.description" />
                  </p>
                  <p className="cart-title mb-4 font-weight-bold"><FormattedMessage id="contacts.success.notify" /></p>
                  <Link to="/contacts" className="btn btn-outline-secondary mr-3"><FormattedMessage id="common.goToContacts" /></Link>
                  <Link to="/mails/drafts/new" className="btn btn-success"><FormattedMessage id="common.createNewEmail" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Success
