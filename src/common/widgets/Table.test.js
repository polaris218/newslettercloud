import React from 'react'
import { shallow } from 'enzyme'

import Table from './Table'
import Column from './Column'
import Pagination from 'components/Pagination'


const defaultProps = {
  list: {
    results: [
      {
        id: 1,
        field1: "value1",
        field2: "value2",
        field3: "value3",
        field4: "value4",
      },
      {
        id: 2,
        field1: "value1",
        field2: "value2",
        field3: "value3",
        field4: "value4",
      },
      {
        id: 3,
        field1: "value1",
        field2: "value2",
        field3: "value3",
        field4: "value4",
      },
      {
        id: 4,
        field1: "value1",
        field2: "value2",
        field3: "value3",
        field4: "value4",
      },
    ]
  },
  paginationLimit: 2,
  paginationCount: 0,
  paginationOnChange: () => {},
}


it('renders without crashing', () => {
  shallow((<Table {...defaultProps}>
    <Column
      field="field1"
      title={'Field 1'}
    />
    <Column
      field="field2"
      title={'Field 2'}
    />
    <Column
      field="field3"
      title={'Field 3'}
    />
    <Column
      field="field4"
      title={'Field 4'}
    />
  </Table>))
})

it("tr renders", () => {
  const wrapper =  shallow((<Table {...defaultProps}>
    <Column
      field="field1"
      title={'Field 1'}
    />
    <Column
      field="field2"
      title={'Field 2'}
    />
    <Column
      field="field3"
      title={'Field 3'}
    />
    <Column
      field="field4"
      title={'Field 4'}
    />
  </Table>))
  expect(wrapper.find('tr').length).toBe(5);
})

it("no pagination when pagination count = 0", () => {
  const wrapper =  shallow((<Table {...defaultProps}>
    <Column
      field="field1"
      title={'Field 1'}
    />
    <Column
      field="field2"
      title={'Field 2'}
    />
    <Column
      field="field3"
      title={'Field 3'}
    />
    <Column
      field="field4"
      title={'Field 4'}
    />
  </Table>))
  expect(wrapper.find(Pagination).length).toBe(0)
})

it("add Pagination when count of items > pagination limit", () => {
  const wrapper =  shallow((<Table {...defaultProps} paginationCount={10}>
    <Column
      field="field1"
      title={'Field 1'}
    />
    <Column
      field="field2"
      title={'Field 2'}
    />
    <Column
      field="field3"
      title={'Field 3'}
    />
    <Column
      field="field4"
      title={'Field 4'}
    />
  </Table>))
  expect(wrapper.find(Pagination).length).toBe(1)
})

it("Columns rendered", () => {
  const wrapper =  shallow((<Table {...defaultProps}>
    <Column
      field="field1"
      title={'Field 1'}
      className={'td'}
    />
    <Column
      field="field2"
      title={'Field 2'}
      className={'td'}
    />
    <Column
      field="field3"
      title={'Field 3'}
      className={'td'}
    />
    <Column
      field="field4"
      title={'Field 4'}
      className={'td'}
    />
  </Table>))
  expect(wrapper.find(Column).length).toBe(20)
})

it("Placeholder rendered", () => {
  const wrapper =  shallow((<Table {...{...defaultProps, placeholderComponent: <div className="placeholder-test-class">Placeholder</div>, list: []}}>
    <Column
      field="field1"
      title={'Field 1'}
      className={'td'}
    />
    <Column
      field="field2"
      title={'Field 2'}
      className={'td'}
    />
    <Column
      field="field3"
      title={'Field 3'}
      className={'td'}
    />
    <Column
      field="field4"
      title={'Field 4'}
      className={'td'}
    />
  </Table>))
  expect(wrapper.find('.placeholder-test-class').length).toBe(1)
})

it("Placeholder hiden", () => {
  const PlaceholderComponent = () => <div>Placeholder</div>
  const wrapper =  shallow((<Table {...{...defaultProps, placeholderComponent: PlaceholderComponent}}>
    <Column
      field="field1"
      title={'Field 1'}
      className={'td'}
    />
    <Column
      field="field2"
      title={'Field 2'}
      className={'td'}
    />
    <Column
      field="field3"
      title={'Field 3'}
      className={'td'}
    />
    <Column
      field="field4"
      title={'Field 4'}
      className={'td'}
    />
  </Table>))
  expect(wrapper.find(PlaceholderComponent).length).toBe(0)
})
