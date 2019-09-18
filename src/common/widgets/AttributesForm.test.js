import React from 'react'
import { shallow } from 'enzyme'

import { TextField } from 'common/forms/fields'
import { AttributesForm } from './AttributesForm'
import ModalTrigger from 'modals/ModalTrigger'


const defaultProps = {
  attributes: {
    data: [
      { name: 'name1' },
      { name: 'name2' },
      { name: 'name3' },
      { name: 'name4' },
    ],
    isLoading: true,
    fetch: () => {},
  },

}

it('renders without crashing', () => {
  shallow(<AttributesForm {...defaultProps}/>)
})

it('form render with correct count of textfields', () => {
  const wrapper =  shallow(<AttributesForm {...defaultProps}/>)
  expect(wrapper.find(TextField).length).toBe(4)
})

it('form render without textfields', () => {
  const wrapper =  shallow(<AttributesForm {...defaultProps} attributes={{ data: [] }}/>)
  expect(wrapper.find(TextField).length).toBe(0)
})

it('form render without modalTrigger', () => {
  const wrapper =  shallow(<AttributesForm {...defaultProps}/>)
  expect(wrapper.find(ModalTrigger).length).toBe(0)
})

it('form render with modalTrigger', () => {
  const wrapper =  shallow(<AttributesForm {...defaultProps} addAttributeModal={true}/>)
  expect(wrapper.find(ModalTrigger).length).toBe(1)
})
