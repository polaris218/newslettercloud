import React from 'react'
import { shallow } from 'enzyme'

import Column from './Column'


const defaultProps = {
  field: 'text',
  item: {
    text: 'test column'
  }
}



it('renders without crashing', () => {
  shallow(<Column />)
})

it('td content of column rendered correctly', () => {
  const wrapper =  shallow(<Column {...defaultProps}/>)
  expect(wrapper.find('td').text()).toBe('test column')
})

it('td custom content of column rendered correctly', () => {
  const customFormat = (value) => {
    return (
      <span>test customFormat</span>
    )
  }
  const wrapper =  shallow(<Column {...defaultProps} format={customFormat}/>)
  expect(wrapper.find('td').props().children).toEqual(<span>test customFormat</span>)
})
