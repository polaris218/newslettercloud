import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { required, validateEmail } from 'validations'
import { TextField, CheckboxField } from 'common/forms'
import ButtonSpinner from 'components/ButtonSpinner'
import { PageTitle } from 'common/widgets'


export default function Signin({ handleSubmit, onSubmit, session }) {
  return (
   <form className="col-6" onSubmit={handleSubmit(onSubmit)} noValidate>
     <PageTitle title="title.login"/>
     <h1 className="mb-4"><FormattedMessage id="auth.loginToNewsletter" /></h1>
     <div className="form-group">
       <TextField
         name="username"
         className="form-control-lg"
         id="email"
         label={<FormattedMessage id="common.inputs.emailAddress" />}
         validate={[ required, validateEmail ]}
       />
     </div>
     <div className="form-group mb-4">
       <TextField
         type="password"
         name="password"
         className="form-control-lg"
         id="password"
         label={<FormattedMessage id="common.inputs.password" />}
         validate={[ required ]}
       />
     </div>
     <div className="form-group mb-4">
       <CheckboxField name="remember_me" boxLabel={<FormattedMessage id="common.rememberMe" />} />
     </div>
     <div className="row mb-4 align-items-center">
       <div className="col-6">
         <Link to="/auth/forgot" className="btn-link small font-weight-bold"><FormattedMessage id="auth.forgotPassword" /></Link>
       </div>
       <div className="col-6 text-right">
         <ButtonSpinner spin={session.isLoading} className="btn btn-lg btn-success"><FormattedMessage id="auth.login" /></ButtonSpinner>
       </div>
     </div>
     <div className="row mb-2 align-items-center justify-content-start">
       <div className="col-12 small font-weight-bold">
        <FormattedMessage id="auth.dontHaveAccount" /> <Link className="btn-link font-weight-bold" to="/auth/signup"><FormattedMessage id="auth.signup" /></Link>
      </div>
     </div>
   </form>
  )
}
