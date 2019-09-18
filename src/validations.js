import React from 'react'
import omit from 'lodash/omit'
import { FormattedMessage } from 'react-intl'

import { getAttributesObject } from 'common/utils/helpers'


export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\u0080-\u00ff\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const test = !email || re.test(String(email).toLowerCase());
  return !test ? <FormattedMessage id="validations.email" /> : undefined
}

export const validateUrl = (url) => {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
  const test = !url || re.test(String(url).toLowerCase());
  return !test ? <FormattedMessage id="validations.url" /> : undefined
}

export const confirmPassword = (confirmPassword, values) => {
  const checkName = 'new_password' in values
  let password = checkName ? 'new_password' : 'password'
  if(!values[password]) return undefined
  return confirmPassword !== values[password] ? <FormattedMessage id="validations.password.match" /> : undefined
}

const maxLength = max => value =>
  value && value.length > max ? <FormattedMessage id="validations.characters.max" values={{ max }} /> : undefined

const minLength = min => value =>
  value && value.length < min ? <FormattedMessage id="validations.characters.min" values={{ min }} /> : undefined

export const maxLength255 = maxLength(255)
export const minLength6 = minLength(6)

export const required = value => (value === undefined || value === null) ? <FormattedMessage id="validations.required" /> : undefined

export const requiredHtml = value => value ? undefined : <FormattedMessage id="validations.html" />

export const selectUniqueValue = (value, form, props, name) => {
  const attributes = getAttributesObject(form.attributes)
  let obj = { email: form.email, first_name: form.first_name, last_name: form.last_name, ...attributes }
  let newName = name.replace(/attributes.atr_/g, '')

  obj = omit(obj, [newName])
  const checkValue = Object.values(obj).filter(i => i && i).some(i => i === value)
  return checkValue ? <FormattedMessage id="validations.columns" /> : undefined
}
