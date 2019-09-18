import { request } from './common';

const LISTS_URL = '/lists/';

/**
 * Gets lists
 *
 * !!! NOTE:
 * - If request does not have `paginate_by` in query string - API returns first 10 items.
 * - If request has `paginate_by=200` API limits count of items to 100 event we request more.
 *
 * @param {object} query - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {10} for preview and {100} for one page
 */
export function getLists(query = {}) {
  return request({
    url: `${LISTS_URL}`,
    method: 'GET',
    query
  });
}

/**
 * It gets all list items at once.
 *
 *    !!! NOTE: This is workaround because of weird API
 * - If request does not have `paginate_by` in query string - API returns first 10 items.
 * - If request has `paginate_by=200` API limits count of items to 100 event we request more.
 *
 * @param {object} query - query parameters
 *
 *  page {number} - Page to show. Default is {1}
 *  paginate_by {number} - Number of items in one page. Default is {10} for preview and {100} for one page
 */
export async function getAllLists() {
  let page = 1;
  const allLists = await getLists({ paginate_by: 100, page });

  if (allLists instanceof Error) return allLists; // Error

  while (allLists.results.length < allLists.count) {
    page += 1;
    const request = await getLists({ paginate_by: 100, page });

    if (request instanceof Error) return request; // Error

    allLists.results = [...allLists.results, ...request.results];
  }

  return allLists;
}

/**
 * Create random generated list
 */
export function createRandomList() {
  function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 8; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const str = makeid();

  const list = {
    name: str,
    sender: `${str}@lkiluiu.com`,
    email: '',
    description: ''
  };

  // const data = JSON.stringify(list);

  return request({
    url: `${LISTS_URL}`,
    method: 'POST',
    data: list
  });
}

export function createList(data, query) {
  return request({
    url: `${LISTS_URL}`,
    method: 'POST',
    data,
    query
  });
}

export function editList(data, query) {
  return request({
    url: `${LISTS_URL}${data.hash}/`,
    method: 'PATCH',
    data,
    query
  });
}

export function removeList(hash) {
  return request({
    url: `${LISTS_URL}${hash}/`,
    method: 'DELETE',
  });
}
