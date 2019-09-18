import API from 'api'

export function getStats(query = {}) {
  return API('stats').get(query)
}
