import { request } from './common';

const PENDING_REVIEW_MAILS_URL = '/mails/pending_review/';
const STOPPED_MAILS_URL = '/mails/stopped/';
const DRAFT_MAILS_URL = '/mails/drafts/';
const SCHEDULED_MAILS_URL = '/mails/scheduled/';
const SENT_MAILS_URL = '/mails/sent/';
const RESPONDERS_MAILS_URL = '/mails/responders/';
const ALL_MAILS = '/mails/all/';

/**
 *
 * @param {object} paginate - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {5} for preview and {100} for one page
 */
export function getPendingReviewMails(paginate = {}) {
  return request({
    url: `${PENDING_REVIEW_MAILS_URL}`,
    method: 'GET',
    query: paginate
  });
}

/**
 *
 * @param {object} paginate - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {5} for preview and {100} for one page
 */
export function getStoppedMails(paginate = {}) {
  return request({
    url: `${STOPPED_MAILS_URL}`,
    method: 'GET',
    query: paginate
  });
}

/**
 *
 * @param {object} paginate - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {5} for preview and {100} for one page
 */
export function getDraftMails(paginate = {}) {
  return request({
    url: `${DRAFT_MAILS_URL}`,
    method: 'GET',
    query: paginate
  });
}

/**
 *
 * @param {object} paginate - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {5} for preview and {100} for one page
 */
export function getScheduledMails(paginate = {}) {
  return request({
    url: `${SCHEDULED_MAILS_URL}`,
    method: 'GET',
    query: paginate
  });
}

/**
 *
 * @param {object} paginate - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {5} for preview and {100} for one page
 */
export function getSentMails(paginate = {}) {
  return request({
    url: `${SENT_MAILS_URL}`,
    method: 'GET',
    query: paginate
  });
}

/**
 *
 * @param {object} paginate - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {5} for preview and {100} for one page
 */
export function getRespondersMils(paginate = {}) {
  return request({
    url: `${RESPONDERS_MAILS_URL}`,
    method: 'GET',
    query: paginate
  });
}

export function copyMail(id) {
  return request({
    url: `${ALL_MAILS}${id}/clone/`,
    method: 'POST',
  });
}
