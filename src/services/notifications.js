import API from 'api'


export function updateNotification(id, data) {
  return API(`notifications/${id}`).patch(data)
}
