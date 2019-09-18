import React from 'react'
import { FormattedMessage } from 'react-intl'

import { required, confirmPassword } from 'validations'
import { TextField } from 'common/forms'
import ButtonSpinner from 'components/ButtonSpinner'
import { PageTitle } from 'common/widgets'


export default function ResetPassword({ handleSubmit, onSubmit, resetPasswordConfirm }) {
  return (
    <form className="col-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PageTitle title="title.forgotPassword"/>
      <h1 className="mb-4"><FormattedMessage id="common.chooseANewPassword" /></h1>
      <div className="form-group">
        <TextField
          name="password"
          label={<FormattedMessage id="common.inputs.password" />}
          className="form-control-lg"
          type="password"
          validate={[ required  ]}
        />
      </div>
      <div className="form-group">
        <TextField
          name="confirm-password"
          type="password"
          label={<FormattedMessage id="common.inputs.passwordAgain" />}
          className="form-control-lg"
          id="email"
          validate={[ required, confirmPassword ]}
        />
      </div>
      <div className="row mb-2">
        <div className="col-6 text-left">
          <ButtonSpinner spin={resetPasswordConfirm.isLoading} className="btn btn-lg btn-success"><FormattedMessage id="common.save" /></ButtonSpinner>
        </div>
      </div>
    </form>
  )
}
