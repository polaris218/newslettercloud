import { request } from './common';

const BLOCK_TEMPLATES_URL = '/mails/templates/block';
const ADVANCED_TEMPLATES_URL = '/mails/templates/html';

/**
 * Gets standard public templates
 *
 * @param {object} query - query parameters passed as key-value pair. Usually pagination is here.
 */
export function getBlockTemplatesPublicStandard(query = {}) {
  return request({
    url: `${BLOCK_TEMPLATES_URL}/`,
    method: 'GET',
    query: { ...query, type: 'public', responsive: 2 }
  });
}

/**
 * Gets designed public templates
 *
 * @param {object} query - query parameters passed as key-value pair. Usually pagination is here.
 */
export function getBlockTemplatesPublicDesigned(query = {}) {
  return request({
    url: `${BLOCK_TEMPLATES_URL}/`,
    method: 'GET',
    query: { ...query, type: 'public', responsive: 2, designed: true }
  });
}

/**
 * Gets personal templates made with block editor
 *
 * @param {object} query - query parameters passed as key-value pair. Usually pagination is here.
 */
export function getBlockTemplatesPersonal(query = {}) {
  return request({
    url: `${BLOCK_TEMPLATES_URL}/`,
    method: 'GET',
    query: { ...query, type: 'personal' }
  });
}

/**
 * Gets personal templates made with advanced editor
 *
 * @param {object} query - query parameters passed as key-value pair. Usually pagination is here.
 */
export function getAdvancedTemplates(query = {}) {
  return request({
    url: `${ADVANCED_TEMPLATES_URL}/`,
    method: 'GET',
    query: query
  });
}
