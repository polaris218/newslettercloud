import { isEmpty, range, get } from 'lodash'

import { getDefaultDate } from './formatDate'


export function generateAttributes(data, values) {
  let obj = {}
  if (Array.isArray(data) && !isEmpty(data)) {
    data.forEach(i => {
      if(values && values.some(attr => attr === i.code)) {
        obj[i.code] = true
      } else {
        obj[i.code] = false
      }
    })
  }

  return obj
}

export function generateListOptions(data) {
  if (!Array.isArray(data) || isEmpty(data)) return []
  return data.map(i => ({ value: i.hash, label: i.name }))
}

export function getColumnsOptions(e) {
  if(!e) return []
  const keys = getColumnsKeys(e)
  const connectOptions = Object.entries(keys[0]).map(([key, value]) => ({ value: key, label: value }))
  return connectOptions
}

export function getColumnsKeys(e) {
  if(!e) return {}
  const paragraph = e.split(/\n/g)
  return paragraph.map(line => {
    const array = line.split(/[,\;\t]/)
    const obj = {}
    array.forEach((i, index) => {
      obj[`field${index}`] = i
    })

    return obj
  })
}

export function formatSendAfter(count) {
  if(!count || (!count.days && !count.hours)) return 'Immediately'
  let days = count.days ? count.days + ' days' : ''
  let hours = count.hours? count.hours + ' hours': ''
  return `${days} ${hours}`.trim()
}

export function generateHours(hours = 24) {
  return range(hours).map(value => ({ value, label: value }))
}

export function getStatus(data, slug) {
  if (!data || !data.length) return
  return data.find(i => i.slug === slug).status
}

export function generateListOptionsObject(data, list) {
  if (!Array.isArray(data) || isEmpty(data)) return []
  if(list && Array.isArray(list)) {
    data = data.filter(dataItem => !list.some(listItem => dataItem.hash === listItem.hash))
  }
  return data.map(i => ({ value: { hash: i.hash, name: i.name }, label: i.name }))
}

export function generateSenderOptions(data, withId) {
  if (!Array.isArray(data) || isEmpty(data)) return []
  return data.map(i => ({ value: withId ? i.id : `${i.name}, ${i.email}`, label: `${i.name}, ${i.email}` }))
}

export function cutString(text = '', quantity) {
  if(text.length > quantity) {
    return `${text.substring(0, quantity)}...`
  }

  return text
}

export function getCheckedLists(objLists) {
  const keys = Object.keys(objLists);
  return keys.filter(function(key) {
    return objLists[key]
  })
}

export function onSubmitFail(errors, ...args) {
  for (let field in errors) {
    let invalidElement = document.querySelector(`[name="${field}"]`)
    if (invalidElement && invalidElement.focus) {
      invalidElement.focus()
      break
    }
  }

  return undefined
}

export function mapChartData(data = {}) {
  const labels = Array.isArray(data.unique) ? data.unique.map(item => getDefaultDate(item.end)) : [];
  const openings = Array.isArray(data.unique) ? data.unique.map(item => item.count) : [];
  const clicks = Array.isArray(data.clicks) ? data.clicks.map(item => item.count) : [];

  labels.unshift(0);
  openings.unshift(0);
  clicks.unshift(0);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Openings',
        borderColor: '#3bb279',
        data: openings,
        fill: false
      },
      {
        label: 'Click rate',
        borderColor: '#e7e271',
        data: clicks,
        fill: false
      }
    ]
  }
}

export function getDomain(url) {
  const location = url || window.location.hostname
  return location.replace('beta.', '')
}

export function getCookieDomain(url) {
  const location = url || window.location.hostname
  return '.' + location.split('.').splice(2).join('.');
}

export function getPaymentUrl(url) {
  return `${window.location.origin}/${url}`
}

export function getAttributesObject(attributes = {}) {
  const newAttributes = {}
  Object.keys(attributes).map((attr) => {
    let newLabel = attr
    newLabel = newLabel.replace(/atr_/g, '').replace(/attributes./g, '');
    newAttributes[newLabel] = attributes[attr] || undefined;
  })
  return newAttributes
}

export function transactionsType(type) {
  switch (type) {
    case 1:
      return 'Registration'
    case 2:
      return 'Free to paid'
    case 3:
      return 'Paid to larger paid'
    case 4:
      return 'Recurring'
    default:
      return 'No'
  }
}

export function checkAccountStatus(profile) {
  return get(profile, 'data.subscription.is_contact_based', true) && get(profile, 'data.subscription.is_free', true)
}
