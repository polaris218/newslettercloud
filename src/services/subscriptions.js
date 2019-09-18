import { request } from './common';

const SUBSCRIPTIONS_URL = '/subscriptions';

/**
 *
 * @param {object} query - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {10} for preview and {100} for one page
 */
export function getSubscriptions(query = {}) {
  return request({
    url: `${SUBSCRIPTIONS_URL}/`,
    method: 'GET',
    query
  });
}

export function copySubscriptions(data = {}, query = {}) {
  return request({
    url: `${SUBSCRIPTIONS_URL}/copy/`,
    method: 'POST',
    data,
    query
  });
}

export function moveSubscriptions(data = {}, query = {}) {
  return request({
    url: `${SUBSCRIPTIONS_URL}/move/`,
    method: 'POST',
    data,
    query
  });
}

export function cancelSubscriptions(query = {}) {
  return request({
    url: `${SUBSCRIPTIONS_URL}/cancel/`,
    method: 'POST',
    query
  });
}

export function deleteSubscriptions(query = {}) {
  return request({
    url: `${SUBSCRIPTIONS_URL}/delete/`,
    method: 'POST',
    query
  });
}

export function exportSubscriptions(query = {}) {
  return request({
    url: `${SUBSCRIPTIONS_URL}/export/`,
    method: 'POST',
    query
  });
}
