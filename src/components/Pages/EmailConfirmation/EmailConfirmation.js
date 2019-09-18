import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

import ButtonSpinner from 'components/ButtonSpinner'
import CustomValidationError from 'components/CustomValidationError'
import Spinner from 'components/Spinner'


export default function EmailConfirmation({ confirm, resend, profile, resendConfirmation, success, id }) {
  const profileData = get(profile, 'data') || {}
  const error = get(confirm, 'errors.error')
  return (
    <div className="container relative">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="card text-center">
            <div className="card-body p-5">
              <h3 className="card-title"><FormattedMessage id="emailConfirmation.titleAlready" /></h3>
              <p className="card-text">
                <strong>
                  {
                    profileData.email_confirmation_needed && !id &&
                    <FormattedMessage id="emailConfirmation.description" />
                  }
                  {
                    !profileData.email_confirmation_needed && !id &&
                    <FormattedMessage id="emailConfirmation.descriptionAlready" />
                  }
                  {
                    error &&
                    <CustomValidationError messages={error} />
                  }
                  {
                    success &&
                    <FormattedMessage id="emailConfirmation.descriptionSuccess" />
                  }
                </strong>
              </p>
              {
                (profileData.email_confirmation_needed && !id) ?
                <>
                  <p className="card-text">
                    <FormattedMessage id="emailConfirmation.text" />
                  </p>
                  <ButtonSpinner
                    className="btn btn-success"
                    spin={resend.isLoading}
                    disabled={resend.isLoading}
                    onClick={resendConfirmation}
                  >
                    <FormattedMessage id="emailConfirmation.button" />
                  </ButtonSpinner>
                </> :
                <Link
                  className="btn btn-success"
                  to="/"
                >
                  <FormattedMessage id="common.ok" />
                </Link>
              }
              <Spinner show={profile.isLoading || confirm.isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
