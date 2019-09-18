import React from 'react'
import { FormattedMessage } from 'react-intl'

import ConfirmModal from './ConfirmModal'
import { TextField } from 'common/forms/fields'
import { required, confirmPassword, validateEmail, minLength6 } from 'validations'
import Spinner from 'components/Spinner'


export default function LoginDetails({ editPassword, showModal, toggleEditPassword, handleSubmit, onSubmit, user, onClose, reset }) {
    return (
      <>
        <div className="card mb-5">
          <div className="card-body">
            <h4 className="card-title"><FormattedMessage id="profile.loginDetails" /></h4>
            <p className="card-text">
              <FormattedMessage id="profile.loginDetails.description" />
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <TextField name="first_name" label={<FormattedMessage id="common.inputs.firstName" />} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <TextField name="last_name" label={<FormattedMessage id="common.inputs.lastName" />} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <TextField name="email" label={<FormattedMessage id="common.inputs.email" />} required validate={[ required, validateEmail ]} />
              </div>
              <label for="new_password"><FormattedMessage id={editPassword ? 'common.inputs.newPassword' : 'common.inputs.password'} /></label>
              <div className="input-group mb-3">
                <div className="flex-fill">
                  <TextField
                    type="password"
                    name="new_password"
                    placeholder={!editPassword && '*********'}
                    disabled={!editPassword}
                    validate={[ minLength6 ]}
                  />
                </div>
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button" onClick={toggleEditPassword}>
                    {editPassword ? <FormattedMessage id="common.cancelChange" /> : <FormattedMessage id="common.changePassword" />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                {editPassword &&
                  <TextField
                    type="password"
                    name="confirm_new_password"
                    label={<FormattedMessage id="common.inputs.repeatPassword" />}
                    validate={[ confirmPassword ]}
                  />
                }
              </div>
              <div className="form-row justify-content-end">
                <button className="btn btn-link mt-2"
                  onClick={(ev) => {
                    ev.preventDefault()
                    reset()
                  }}
                >
                  <FormattedMessage id="common.cancel" />
                </button>
                <button className="btn btn-success mt-2 ml-2">
                  <FormattedMessage id="common.save" />
                </button>
              </div>
              {
                showModal && <ConfirmModal
                  isLoading={user.isLoading}
                  onClose={onClose}
                  handleSubmit={handleSubmit}
                  updateUser={user.update}
                  toggleEditPassword={toggleEditPassword}
                />
              }
            </form>
          </div>
          <Spinner show={user.isLoading} />
        </div>
      </>
    );
}
