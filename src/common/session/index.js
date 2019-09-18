import CheckAccess from './CheckAccess'

const logout = function() {
  const location = window.location.hostname
  document.cookie = `jwt=; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  document.cookie = `jwt=; domain=${location}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  document.cookie = `jwt=; domain=${location.replace('beta','').replace('.app', '')}; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure=true; path=/`
  document.cookie = `apisessionid=; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  document.cookie = `apisessionid=; domain=${location.replace('beta','')}; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure=true; path=/`
  return {
    type: '@ds-resource/set-data',
    meta: {
      resource: { namespace: 'session' },
    },
    payload: {},
  }
}

export {
  CheckAccess,
  logout,
}