import React from 'react'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'

import { required, selectUniqueValue } from 'validations'
import { CheckboxField, SelectField } from 'common/forms/fields'


export default function ConnectFields({ connectOptions, attributes }) {
  return (
    <div className="card mb-4" id="connect_fields">
      <div className="card-header">
        <h5 className="card-title mb-0">3. <FormattedMessage id="contacts.connectFields.title" /></h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          <FormattedMessage id="contacts.connectFields.description" />
        </p>
        <SelectField
          options={[{label: 'Select Email column...', value: null} ,...connectOptions]}
          placeholder={<FormattedMessage id="contacts.connectFields.tellUs" />}
          name="email"
          label={<FormattedMessage id="common.inputs.email" />}
          validate={[ required, selectUniqueValue ]}
          required
        />
        <div className="connect-fields">
          <div className="connect-fields__field">
            <SelectField
              options={[{label: 'Select First name column...', value: null} ,...connectOptions]}
              name="first_name"
              label={<FormattedMessage id="common.inputs.firstName" />}
              validate={[ selectUniqueValue ]}
            />
          </div>
          <div className="connect-fields__field">
            <SelectField
              options={[{label: 'Select Last name column...', value: null} ,...connectOptions]}
              name="last_name"
              label={<FormattedMessage id="common.inputs.lastName" />}
              validate={[ selectUniqueValue ]}
            />
          </div>
          {
            !!get(attributes, 'data.length') && attributes.data.map(i => (
              <div key={i.code} className="connect-fields__field mt-3">
                <SelectField
                  options={[{label: `Select ${i.name} column...`, value: null} ,...connectOptions]}
                  name={`attributes.atr_${i.code}`}
                  label={i.name}
                  validate={[ selectUniqueValue ]}
                />
              </div>
            ))
          }
        </div>
        <CheckboxField
          name="consent"
          boxLabel={<FormattedMessage id="contacts.connectFields.consent" />}
          required
          validate={[ required ]}
          description={<FormattedMessage id="contacts.connectFields.consentDescription" />}
        />
      </div>
    </div>
  )
}
