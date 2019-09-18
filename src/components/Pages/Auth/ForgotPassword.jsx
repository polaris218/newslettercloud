import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { required, validateEmail } from 'validations'
import { TextField } from 'common/forms'
import ButtonSpinner from 'components/ButtonSpinner'
import { PageTitle } from 'common/widgets'


export default function ForgotPassword({ handleSubmit, onSubmit, resetPassword }) {
  return (
    <form className="col-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PageTitle title="title.forgotPassword"/>
      <h1 className="mb-4"><FormattedMessage id="common.resetPassword" /></h1>
      <div className="form-group">
        <TextField
          name="email"
          label={<FormattedMessage id="common.inputs.emailAddress" />}
          className="form-control-lg"
          id="email"
          validate={[ required, validateEmail ]}
        />
      </div>
      <div className="row mb-2 align-items-center">
        <div className="col-6">
          <Link to="/auth/signin" className="btn-link"><FormattedMessage id="common.backToLogin" /></Link>
        </div>
        <div className="col-6 text-right">
          <ButtonSpinner spin={resetPassword.isLoading} className="btn btn-lg btn-success"><FormattedMessage id="common.resetPassword" /></ButtonSpinner>
        </div>
      </div>
    </form>
  )
}
