import {
  generateAttributes,
  generateListOptions,
  formatSendAfter,
  getColumnsOptions,
  generateHours,
  getColumnsKeys,
  getStatus,
  generateListOptionsObject,
  generateSenderOptions,
  getCheckedLists,
  cutString,
  getDomain,
  getAttributesObject,
} from './helpers'

describe('function generateAttributes', () => {
  const attributesList = [
    {
      name: 'First',
      code: 'first',
    },
    {
      name: 'Second',
      code: 'second',
    },
    {
      name: 'Third',
      code: 'third',
    },
  ]
  const attributesData = ['second']
  it('should return valid object', () => {
    const attributesResult = { first: false, second: true, third: false }
    const result = generateAttributes(attributesList, attributesData)
    expect(result).toEqual(attributesResult)
  })
  it('should return empty object', () => {
    const attributesResult = {}
    const result = generateAttributes(null, attributesData)
    expect(result).toEqual(attributesResult)
  })
  it('shoul return all keys with false', () => {
    const attributesResult = { first: false, second: false, third: false }
    const result = generateAttributes(attributesList, [])
    expect(result).toEqual(attributesResult)
  })
})

describe('function generateListOptions', () => {
  const list = [
    {
      name: 'First',
      hash: '111',
    },
    {
      name: 'Second',
      hash: '222',
    },
  ]
  it('should return valid array', () => {
    const listResult = [{ label: 'First', value: '111' }, { label: 'Second', value: '222' }]
    const result = generateListOptions(list)
    expect(result).toEqual(listResult)
  })
  it('should return empty array', () => {
    const listResult = []
    const result = generateListOptions(null)
    expect(result).toEqual(listResult)
  })
})

describe('function getColumnsOptions', () => {
  const data = 'email@email.com,Name,Last Name'
  it('should return valid array', () => {
    const listResult = [
      { label: 'email@email.com', value: 'field0' },
      { label: 'Name', value: 'field1' },
      { label: 'Last Name', value: 'field2' }
    ]
    const result = getColumnsOptions(data)
    expect(result).toEqual(listResult)
  })
  it('should return empty array', () => {
    const listResult = []
    const result = getColumnsOptions(null)
    expect(result).toEqual(listResult)
  })
})

describe('function getColumnsKeys', () => {
  const data = 'email@email.com,Matt,Daymon'
  it('should return valid array', () => {
    const listResult = [{ field0: 'email@email.com', field1: 'Matt', field2: 'Daymon'}]
    const result = getColumnsKeys(data)
    expect(result).toEqual(listResult)
  })
  it('should return empty array', () => {
    const listResult = {}
    const result = getColumnsKeys(null)
    expect(result).toEqual(listResult)
  })
})

describe('function formatSendAfter', () => {
  it('should return valid hours and days', () => {
    const stringResult = '3 days 5 hours'
    const result = formatSendAfter({ days: 3, hours: 5 })
    expect(result).toEqual(stringResult)
  })
  it('should return Immediately word', () => {
    const listResult = 'Immediately'
    const result = formatSendAfter(null)
    expect(result).toEqual(listResult)
  })
})

describe('function generateHours', () => {
  it('should return valid hours array', () => {
    const hoursLength = 24
    const result = generateHours(24)
    expect(result.length).toEqual(hoursLength)
  })
})

describe('function getStatus', () => {
  it('should return valid status', () => {
    const array = [
      { slug: '123', status: 'ok' },
      { slug: '321', status: 'no' },
    ]
    const result = getStatus(array, '123')
    expect(result).toEqual('ok')
  })

  it('should return undefined', () => {
    const result = getStatus([], '123')
    expect(result).toEqual(undefined)
  })
})

describe('function generateListOptionsObject', () => {
  it('should return valid status', () => {
    const array = [
      { name: 'name1', hash: 'hash1' },
      { name: 'name2', hash: 'hash2' },
      { name: 'name3', hash: 'hash3' },
    ]
    const result = generateListOptionsObject(array)
    expect(result).toEqual([
      {
        value: {
          hash: 'hash1',
          name: 'name1',
        },
        label: 'name1'
      },
      {
        value: {
          hash: 'hash2',
          name: 'name2',
        },
        label: 'name2'
      },
      {
        value: {
          hash: 'hash3',
          name: 'name3',
        },
        label: 'name3'
      }
    ])
  })

  it('should return empty aray', () => {
    const result = generateListOptionsObject(undefined)
    expect(result).toEqual([])
  })
})

describe('function generateSenderOptions', () => {
  it('should return valid status when we not use withId', () => {
    const array = [
      { id: 1, name: 'name1', email: 'email1' },
      { id: 2, name: 'name2', email: 'email2' },
      { id: 3, name: 'name3', email: 'email3' },
    ]
    const result = generateSenderOptions(array)
    expect(result).toEqual([
      { value: 'name1, email1', label: 'name1, email1' },
      { value: 'name2, email2', label: 'name2, email2' },
      { value: 'name3, email3', label: 'name3, email3' },
    ])
  })

  it('should return valid status when we use withId', () => {
    const array = [
      { id: 1, name: 'name1', email: 'email1' },
      { id: 2, name: 'name2', email: 'email2' },
      { id: 3, name: 'name3', email: 'email3' },
    ]
    const result = generateSenderOptions(array, true)
    expect(result).toEqual([
      { value: 1, label: 'name1, email1' },
      { value: 2, label: 'name2, email2' },
      { value: 3, label: 'name3, email3' },
    ])
  })

  it('should return empty aray', () => {
    const result = generateListOptionsObject(undefined)
    expect(result).toEqual([])
  })
})

describe('function getCheckedLists', () => {
  it('should return empty array', () => {
    const obj = {
      test1: false,
      test2: false,
      test3: false,
    }
    const result = getCheckedLists(obj)
    expect(result).toEqual([])
  })

  it('should return valid status', () => {
    const obj = { test1: false, test2: true, test3: false, test4: true }
    const result = getCheckedLists(obj)
    expect(result).toEqual([ 'test2', 'test4' ])
  })
})

describe('function cutString', () => {
  const str = 'Lorem ipsum dolores'
  it('should return cutted string', () => {
    const result = cutString(str, 5)
    expect(result).toEqual('Lorem...')
  })

  it('should return full string', () => {
    const result = cutString(str, 100)
    expect(result).toEqual('Lorem ipsum dolores')
  })
})

describe('function getDomain', () => {
  it('should return url without beta', () => {
    const result = getDomain('beta.test.com')
    expect(result).toEqual('test.com')
  })
})

describe('function getAttributesObject', () => {
  it('should return object with keys without "atr_"', () => {
    const result = getAttributesObject({
      test: 1,
      atr_test2: 5,
      atr_test3: 10,
      test_4: 15,
    })
    expect(result).toEqual({ "test": 1, "test2": 5, "test3": 10, "test_4": 15 })
  })
})
