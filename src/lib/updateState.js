function updateObject(obj, key, value) {
  return obj[key] === value ? obj : { ...obj, [key]: value };
}

function updateArray(arr, idx, value) {
  return arr[idx] === value ? arr : [...arr.slice(0, idx), value, ...arr.slice(idx + 1)];
}

function getValue(state, key) {
  let value;

  if (typeof key === 'string') {
    if (Object.prototype.toString(state) !== '[object Object]') {
      throw new Error(`State is not an Object, an you is trying to get property '${key}'!`);
    }

    if (state.hasOwnProperty(key)) {
      value = state[key];
    } else {
      throw new Error(`Object has no property ${key}!`);
    }
  } else if (typeof key === 'number') {
    if (!Array.isArray(state)) {
      throw new Error(`State is not an Array, an you is trying to get value at index [${key}]!`);
    }

    value = state[key];
    if (typeof value === 'undefined') {
      throw new Error(`There is no item at index [${key}] in array!`);
    }
  }

  return value;
}

function getKeys(keys) {
  const arr = keys.split('.');
  const reducer = (acc, current) => {
    const idx = current.split('[').map(item => (item.indexOf(']') > -1 ? +item.slice(0, -1) : item));
    return [...acc, ...idx];
  };

  return arr.reduce(reducer, []);
}

export function updateState(state, keyStr, targetValue) {
  const keys = getKeys(keyStr);

  const next = state => {
    const key = keys.shift();
    const value = getValue(state, key);
    const newValue = keys.length ? next(value) : targetValue;
    const newState = typeof key === 'string' ? updateObject(state, key, newValue) : updateArray(state, key, newValue);

    return newState;
  };

  return next(state);
}
