import { request } from './common';

const ATTRIBUTES_URL = '/attributes';

/**
 *
 * @param {object} query - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {10} for preview and {100} for one page
 */
export function getAttributes(query = {}) {
  return request({
    url: `${ATTRIBUTES_URL}/`,
    method: 'GET',
    query
  });
}

export function createAttribute(data, query = {}) {
  return request({
    url: `${ATTRIBUTES_URL}/`,
    method: 'POST',
    data,
    query
  });
}

export function getAttribute(attributeCode) {
  return request({
    url: `${ATTRIBUTES_URL}/${attributeCode}/`,
    method: 'GET'
  });
}

export function deleteAttribute(attributeCode) {
  return request({
    url: `${ATTRIBUTES_URL}/${attributeCode}/`,
    method: 'DELETE'
  });
}

export function editAttribute(attributeCode, data) {
  return request({
    url: `${ATTRIBUTES_URL}/${attributeCode}/`,
    method: 'PATCH',
    data
  });
}
