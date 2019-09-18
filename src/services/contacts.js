import { request } from './common';

const CONTACTS_URL = '/contacts';

/**
 *
 * @param {object} query - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {10} for preview and {100} for one page
 *  search {string} - Filter by string.
 *  active {number} - can be {0} or {1}.
 *  updated_gt {date in format 'yyyy-mm-dd hh:mm'}.
 *  not_subscribed {null} - can have only value {1}.
 *  lists {string} - Filter contacts by list ID.
 */
export function getContacts(query = {}) {
  return request({
    url: `${CONTACTS_URL}/`,
    method: 'GET',
    query
  });
}

export function createContact(data, query) {
  return request({
    url: `${CONTACTS_URL}/`,
    method: 'POST',
    data,
    query
  });
}

export function deleteContacts(data) {
  return request({
    url: `${CONTACTS_URL}/delete/`,
    method: 'POST',
    data
  });
}

export function subscribeContacts(data) {
  return request({
    url: `${CONTACTS_URL}/subscribe/`,
    method: 'POST',
    data
  });
}

export function exportContacts(query) {
  return request({
    url: `${CONTACTS_URL}/export/`,
    method: 'POST',
    query
  });
}

export function importContactsFile(data) {
  return request({
    url: `${CONTACTS_URL}/import/file/`,
    method: 'POST',
    data: data,
  });
}

export function importContactsBulk(data) {
  return request({
    url: `${CONTACTS_URL}/import/bulk/`,
    method: 'POST',
    data: data,
  });
}

export function importContactsFormData(hash, file) {
  let data = new FormData()
  data.append('file', file)

  return request({
    url: `${CONTACTS_URL}/import/file/${hash}/`,
    method: 'POST',
    formData: true,
    data: data,
  });
}