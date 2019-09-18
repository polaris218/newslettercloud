import { request } from './common';

const INVOICES_URL = '/invoices';

export function getInvoices(query = {}) {
  return request({
    url: `${INVOICES_URL}/`,
    method: 'GET',
    query: {}
  });
}
