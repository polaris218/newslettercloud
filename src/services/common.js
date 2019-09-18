import { omit } from 'lodash'

export const defaultHeaders = {
  'Content-Type': 'application/json; charset=utf-8'
};

const REQUESTS_TYPE_WITH_BODY = ['POST', 'PUT', 'DELETE', 'PATCH'];
const ERROR_4xx_CODES = [400, 404];

export function stringifyQuery(obj = {}) {
  return Object.keys(obj)
    .filter(k => obj[k] !== null && typeof obj[k] !== 'undefined')
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');
}

export function getFullUrl(url, query) {
  const queryStr = stringifyQuery(query);
  debugger;
  return `/api/v3${url}${queryStr ? '?' + queryStr : ''}`;
}

export async function request({ url = '', method = 'GET', headers = defaultHeaders, data = {}, query = {}, formData }) {
  let obj = { method, headers, credentials: 'include' };

  if (REQUESTS_TYPE_WITH_BODY.includes(method) && !formData) {
    obj.body = JSON.stringify(data);
  }

  if (REQUESTS_TYPE_WITH_BODY.includes(method) && formData) {
    obj.body = data;
    obj = omit(obj, 'headers')
  }

  const response = await fetch(getFullUrl(url, query), obj);
  let resData = null;

  if (response.ok) {
    if (response.status === 204) {
      resData = {};
    } else if (!ERROR_4xx_CODES.includes(response.status)) {
      try {
        resData = await response.json();
      } catch (error) {
        // TODO: log error
        resData = new Error('JSON is not valid!');
      }
    }
  } else {
    resData = new Error(response.statusText);
    resData.status = response.status;

    let reason = {};
    try {
      reason = await response.json();
    } catch (error) {
      reason = { message: 'Reason is not provided!' };
    }

    resData.reason = reason;
  }

  return resData;
}
