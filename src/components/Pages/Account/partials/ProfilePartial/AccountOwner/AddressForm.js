import React from 'react'
import { FormattedMessage } from 'react-intl'

import { COUNTRIES } from './common'
import { TextField, SelectField } from 'common/forms/fields'
import { required, validateEmail } from 'validations'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'


export default function AddressForm({ countryValue, address, billing, isBilling , handleSubmit, onSubmit, isLoading, disableButton }) {
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <SelectField name="country" label={<FormattedMessage id="common.inputs.country" />} options={COUNTRIES} required validate={[ required ]} />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <TextField name="company" label={<FormattedMessage id="common.inputs.company" />} />
          </div>
        </div>
        {countryValue === 'SE' ? (
          <div className="col">
            <div className="form-group">
              <TextField name="org_number" label={<FormattedMessage id="common.inputs.organizationNumber" />} />
            </div>
          </div>
        ) : (
          <>
            <div className="col-1">
              <div className="form-group">
                <label htmlFor="vatId" className="text-nowrap"><FormattedMessage id="common.inputs.vatId" /></label>
                <input
                  type="text"
                  className="form-control text-center"
                  name="countryCode"
                  value={countryValue === 'GR' ? 'EL' : countryValue}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <TextField name="vat_id" label="&nbsp;" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <TextField name="address_1" label={<FormattedMessage id="common.inputs.address" />} required validate={[ required ]} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <TextField name="address_2" label={<FormattedMessage id="common.inputs.address2" />} />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <TextField name="zip_code" label={<FormattedMessage id="common.inputs.zipCode" />} required validate={[ required ]} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <TextField name="city" label={<FormattedMessage id="common.inputs.city" />} required validate={[ required ]} />
          </div>
        </div>
      </div>

      <hr />

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <TextField name="email" label={<FormattedMessage id="common.inputs.email" />} validate={[ validateEmail ]} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <TextField name="extra_email" label={<FormattedMessage id="common.inputs.extraEmail" />} validate={[ validateEmail ]} />
          </div>
        </div>
      </div>

      <div className="form-row mb-2">
        <div className="col">
          <div className="form-group">
            <TextField name="phone" type="number" label={<FormattedMessage id="common.inputs.phoneNumber" />} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <TextField name="reference" label={<FormattedMessage id="common.inputs.reference" />} />
          </div>
        </div>
      </div>
      {
        !disableButton &&
        <ButtonSpinner
          type="submit"
          className="btn btn-success"
          spin={isLoading}
          disabled={isLoading}
        >
        {
          !isBilling ?
          <FormattedMessage id="profile.updateOwnerSettings" /> :
          <FormattedMessage id="profile.updateBillingSettings" />
        }
        </ButtonSpinner>
        }
      <Spinner show={isLoading} />
    </form>
  );
}
