/**
 * Creates function that will be called with given arguments
 *
 * @param {function} fn function that will be called
 * @param {...any} args arguments that function will be called with
 * @returns {function}
 */
export const partial = (fn, ...args) => fn.bind(null, ...args);

const pipeTwo = (f, g) => (...args) => g(f(...args));
/**
 * Creates function that will call function parameters in sequence giving
 * result of previous as argument to ne next one
 * @param {...function} fns
 * @returns {function}
 */
export const pipe = (...fns) => fns.reduce(pipeTwo);

const KEY = 'gan-token';
export const TokenStorage = {
  /**
   * Save JWT in to browser's local storage
   * @param {object} val
   */
  set: val => {
    if (!Storage) return;

    const str = JSON.stringify(val);
    localStorage.setItem(KEY, str);
  },

  /**
   * Retrieve JWT from browser's local storage
   * @returns {object}
   */
  get: () => {
    if (!Storage) return;

    const data = localStorage.getItem(KEY);
    return JSON.parse(data);
  }
};

export const noop = () => {};

export function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function removeCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export { updateState } from './updateState';
