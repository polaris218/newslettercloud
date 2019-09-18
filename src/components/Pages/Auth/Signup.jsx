import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { required, validateEmail, confirmPassword } from 'validations'
import { TextField, CaptchaField } from 'common/forms'
import ButtonSpinner from 'components/ButtonSpinner'
import { PageTitle } from 'common/widgets'


export default function Signup({ handleSubmit, onSubmit, session, email }) {
  return (
    <form className="col-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PageTitle title="title.signup"/>
      <h1 className="mb-4"><FormattedMessage id="auth.startedForFree" /></h1>
      <p className="lead mb-4"><FormattedMessage id="auth.signupDescription" /></p>
      <div className="form-group">
        <TextField
          name="email"
          className="form-control-lg"
          id="email"
          label={<FormattedMessage id="common.inputs.emailAddress" />}
          validate={[ required, validateEmail ]}
        />
      </div>
      <div className="form-group">
        <TextField
          label={<FormattedMessage id="common.inputs.password" />}
          type="password"
          name="password"
          className="form-control-lg"
          id="password"
          validate={[ required ]}
        />
      </div>
      <div className="form-group mb-4">
        <TextField
          type="password"
          name="confirm"
          label={<FormattedMessage id="common.inputs.passwordConfirm" />}
          className="form-control-lg"
          id="confirm"
          validate={[ required, confirmPassword ]}
        />
      </div>
      <div className="row mb-3 align-items-center">
        <div className="col-6">
          <CaptchaField
            name="g-recaptcha-response"
            email={email}
          />
        </div>
      </div>
      <div className="row mb-4 align-items-center">
        <div className="col-6">
          <div className="text-align-left mt-2 small font-weight-bold">
            <FormattedMessage id="auth.loginAgree" />
            <Link to="/terms" target="_blank" className="pl-1 pr-1"><FormattedMessage id="auth.terms" /></Link>
          </div>
        </div>
        <div className="col-6 text-right">
          <ButtonSpinner spin={session.isLoading} className="btn btn-lg btn-success"><FormattedMessage id="auth.signupNow" /></ButtonSpinner>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12 small font-weight-bold">
          <FormattedMessage id="auth.alreadyHaveAccount" /> <Link className="btn-link font-weight-bold" to="/auth/signin"><FormattedMessage id="auth.signin" /></Link>
        </div>
      </div>
    </form>
  )
}
