import { countries } from 'common/utils/constants'

export const COUNTRIES = countries.map(({ name, code }) => ({ label: name, value: code }));

export function mapData(response) {
  return {
    country: response.country || '',
    company: response.company || '',
    orgNumber: response.org_number || '',
    addressPrimary: response.address_1 || '',
    addressSecondary: response.address_2 || '',
    city: response.city || '',
    zipCode: response.zip_code || '',
    emailPrimary: response.email || '',
    emailSecondary: response.extra_email || '',
    phone: response.phone || '',
    reference: response.reference || '',
    vatId: response.vat_id || ''
  };
}

export const ERRORS = {
  COUNTRY_IS_NOT_VALID: 'Country is not valid!',
  COUNTRY_FIELD_IS_EMPTY: 'Country field must not be empty!',
  VAT_IS_NOT_VALID: 'VAT id is not valid!',
  ORG_NUMBER_IS_NOT_VALID: 'Organization number is not valid!',
  REQUIRED_FIELD: 'This field is required!'
};

export const initialAddressData = {
  country: '',
  company: '',
  orgNumber: '',
  addressPrimary: '',
  addressSecondary: '',
  city: '',
  zipCode: '',
  emailPrimary: '',
  emailSecondary: '',
  phone: '',
  reference: '',
  vatId: ''
};

export const initialVatValidity = {
  pays_vat: true,
  valid: true
};
