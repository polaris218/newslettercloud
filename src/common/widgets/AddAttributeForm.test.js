import React from 'react'
import { shallow } from 'enzyme'

import { TextField } from 'common/forms/fields'
import { AddAttributeForm } from './AddAttributeForm'
import { Modal } from 'components/Modal'


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
  handleSubmit: () => {},
}

it('renders without crashing', () => {
  shallow(<AddAttributeForm {...defaultProps}/>)
})

it('form render without modalTrigger', () => {
  const wrapper =  shallow(<AddAttributeForm {...defaultProps}/>)
  expect(wrapper.find(Modal).length).toBe(0)
})

it('form render with modalTrigger', () => {
  const wrapper =  shallow(<AddAttributeForm {...defaultProps} addAttributeModal={true}/>)
  expect(wrapper.find(Modal).length).toBe(1)
})
