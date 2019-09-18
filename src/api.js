import React from 'react'
import { SubmissionError } from 'redux-form'
import keys from 'lodash/keys'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'
import isObject from 'lodash/isObject'
import flatMapDeep from 'lodash/flatMapDeep'
import { toast } from 'react-toastify'
import CustomValidationError from 'components/CustomValidationError'
// TODO it seems we can move all query logic to API
import { buildQueryParams } from 'common/utils/queryParams'
import { logout } from 'common/session'


var store

// FIXME make it as middleware
export function configure(s) { store = s }

export default function(endpoint) {
  return new API(endpoint)
}

function deepValues(obj) {
  // creates flat list of all `obj` values (including nested)
  if(isPlainObject(obj) || Array.isArray(obj)) {
    return flatMapDeep(obj, deepValues)
  }
  return obj
}

function hasFile(obj) {
  // check if `obj` has at least one `File` instance
  return deepValues(obj).some((v) => (v instanceof File || v instanceof Blob))
}

class API {
  constructor(endpoint) {
    if(!/^\w[^?]+\w$/.test(endpoint)) {
      console.error('invalid API endpoint: \'%s\'. API endpoint should not contain trailing slashes and query params', endpoint)
    }
    this.endpoint = endpoint
  }

  prepareBody(body, isMultipartFormData) {
    if(isEmpty(body)) {
      return body
    }

    if(isPlainObject(body)) {
      // FIXME we shouldn't send file object represented by url
      ['avatar', 'logo', 'file'].forEach(field => isString(body[field]) && delete body[field])
    }

    if(isMultipartFormData) {
      const formData = new FormData()

      for(var name in body) {
        if(isFunction(body[name])) {
          // FIXME there should not be functions
          console.warn('API detects invalid data value (function) in field:', name)
          continue
        } else if(Array.isArray(body[name])) {
          body[name].forEach((value, i) => {
            if(isObject(value)) {
              keys(value).forEach(key => {
                formData.append(`${name}[${i}]${key}`, value[key])
              })
            } else {
              formData.append(name, value)
            }
          })
        } else if(isPlainObject(body[name])) {
          keys(body[name]).forEach(key => {
            formData.append(`${name}.${key}`, body[name][key])
          })
        } else {
          if(body[name] !== null) {
            // FIXME this shouldn't be here. check form body serialization
            // https://github.com/erikras/redux-form/issues/701
            formData.append(name, body[name])
          }
        }
      }
      return formData
    } else {
      return JSON.stringify(body)
    }
  }

  handleResponseCallback(response) {
    if(response.status === 401) {
      // 401 (Unauthorized)
      store.dispatch(logout())
      return
    } else if(response.status === 204) {
      // 204 (No Content)
      return Promise.resolve({})
    }

    /*
     * TODO: improve response body and headers for empty response
     */
    if(response.headers.get('Content-Type') !== 'application/json') {
      if(response.ok) {
        return Promise.resolve({})
      }
      return Promise.reject(response)
    }


    // console.log(response.json());
    // response.then(response => response.json())
    // .then((response) => {console.log(response)})
    // console.log('lalslsl', response.json())



    try {
    return response.json()
      .then(function(body) {
        if(response.ok) {
          return body
        }

        // handle errors
        var errors = {}
        keys(body).forEach(key => {
          let eKey = key
          if(key === 'non_field_errors' || key === 'nonFieldErrors' || key === 'detail') {
            eKey = '_error'
          }
          if(Array.isArray(body[key])) {
            errors[eKey] = body[key][0]
          } else {
            errors[eKey] = body[key]
          }

          let error = errors['_error'] || errors['error']

          if(error) {
            toast.error(() => <CustomValidationError messages={error} />)
          }
        })

        throw new SubmissionError(errors)
      })
    } catch (e) {
      return response.body || {};
    }
  }

  request(method, params = {}, body = {}) {
    const queryParams = isEmpty(params) ? '' : '?' + buildQueryParams(params)
    const resource = `${process.env.REACT_APP_API_URL}${this.endpoint}/${queryParams}`
    const headers = new Headers({
      'Content-Type': 'application/json',
    })
    const isMultipartFormData = hasFile(body)
    isMultipartFormData && headers.delete('Content-Type')

    body = method === 'GET' ? undefined : this.prepareBody(body, isMultipartFormData)
    const options = {
      method,
      headers,
      body,
      credentials: 'include',
    }
    var request = new Request(resource, options)
    return fetch(request).then(this.handleResponseCallback)
  }

  post(body = {}, params = {}) {
    return this.request('POST', params, body)
  }

  get(params) {
    return this.request('GET', params)
  }

  put(body = {}, params = {}) {
    return this.request('PUT', params, body)
  }

  patch(body = {}, params = {}) {
    return this.request('PATCH', params, body)
  }

  options() {
    return this.request('OPTIONS')
  }

  delete(params = {}) {
    return this.request('DELETE', params)
  }
}
