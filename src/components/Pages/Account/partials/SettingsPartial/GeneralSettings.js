import React from 'react'
import { FormattedMessage } from 'react-intl'

import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'
import { timezoneOptions, languages } from 'common/utils/constants'
import { CheckboxField, SelectField } from 'common/forms/fields'


export default function GeneralSettings({ handleSubmit, onSubmit, profile }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title"><FormattedMessage id="settings.newsletter" /></h3>
            <p className="card-text">
              <FormattedMessage id="settings.newsletterDescription" />
            </p>
            <div className="form-group">
              <CheckboxField name="subscribed_to_newsletter" boxLabel={<FormattedMessage id="common.inputs.subscribersToLetter" />} />
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title"><FormattedMessage id="settings.language" /></h3>
            <p className="card-text">
              <FormattedMessage id="settings.languageDescription" />
            </p>
            <div className="form-group">
              <SelectField name="language" options={languages} />
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title"><FormattedMessage id="settings.timeZone" /></h3>
            <p className="card-text"><FormattedMessage id="settings.timeZoneDescription" /></p>
            <div className="form-group">
              <SelectField name="timezone" options={timezoneOptions} />
            </div>
          </div>
        </div>

        <ButtonSpinner className="btn btn-success d-block ml-auto" spin={profile.isLoading} disabled={profile.isLoading}>
          <FormattedMessage id="common.save" />
        </ButtonSpinner>
        <Spinner show={profile.isLoading} />
      </form>
  )
}
