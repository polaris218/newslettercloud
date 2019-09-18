import moment from 'moment'

export function getDefaultDate(date) {
  return moment(date).format('YYYY-MM-DD')
}

export function getDefaultTypeDateAndTime(date) {
  return moment(date).format('YYYY-MM-DD') + ' ' + moment(date).format('hh:mm')
}

export function getDefault24TypeDateAndTime(date) {
  return moment(date).format('YYYY-MM-DD') + ' ' + moment(date).format('hh:mm')
}

export function weekAgo(date) {
  return moment(date).add(-7, 'days').format('YYYY-MM-DD')
}

export function monthAgo(date) {
  return moment(date).add(-1, 'months').format('YYYY-MM-DD')
}

export function yearAgo(date) {
  return moment(date).add(-1, 'years').format('YYYY-MM-DD')
}

export function dateAndTimeToISO(date, time) {
  return date && date.utc().toISOString()
}
