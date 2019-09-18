import { request } from './common';

export const REPORTS_URL = '/reports/';


export function getDetailedReport(reportId = 0) {
  return request({
    url: `${REPORTS_URL}${reportId}/`,
    method: 'GET'
  });
}

/**
 * Get bounced mails
 *
 * @param {number} reportId
 * @param {object} query - values in request's query string
 *
 * example query string:
 * {
 *  page: 1, // cannot be equal to '0'
 *  paginate_by: 100,
 *  ordering: '-opens,-clicks,contact__email'
 * }
 */
export function getBounces(reportId = 0, query = {}) {
  return request({
    url: `${REPORTS_URL}${reportId}/bounces/`,
    method: 'GET',
    query
  });
}

/**
 * Get most active customers
 *
 * @param {number} reportId
 * @param {object} query - values in request's query string
 *
 * example query string:
 * {
 *  page: 1, // cannot be equal to '0'
 *  paginate_by: 100,
 *  ordering: '-opens,-clicks,contact__email'
 * }
 */
export function getMostActiveCustomers(reportId = 0, query = {}) {
  return request({
    url: `${REPORTS_URL}${reportId}/most_active_customers/`,
    method: 'GET',
    query
  });
}

export function getMostPopularLinks(reportId = 0, query = {}) {
  return request({
    url: `${REPORTS_URL}${reportId}/links/`,
    method: 'GET',
    query
  });
}

export function deleteReport(reportId = 0, deleteMail = false) {
  return request({
    url: `${REPORTS_URL}${reportId}/`,
    method: 'DELETE',
    query: {
      delete_mail: deleteMail ? 'true' : 'false'
    }
  });
}

export function exportMostActiveCustomers(reportId = 0) {
  return request({
    url: `${REPORTS_URL}${reportId}/most_active_customers/export`,
    method: 'POST'
  });
}

export function exportLinks(reportId = 0) {
  return request({
    url: `${REPORTS_URL}${reportId}/links/export/`,
    method: 'POST'
  });
}

export function exportBounces(reportId = 0) {
  return request({
    url: `${REPORTS_URL}${reportId}/bounces/export/`,
    method: 'POST'
  });
}

export function exportFullReport(reportId = 0) {
  return request({
    url: `${REPORTS_URL}${reportId}/export/`,
    method: 'POST'
  });
}
