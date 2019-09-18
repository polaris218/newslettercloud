import React from 'react'
import { shallow } from 'enzyme'
import Dropdown from './Dropdown'


it('renders without crashing', () => {
  shallow(<Dropdown />)
})

it("Dropdown open", () => {
  const wrapper = shallow(<Dropdown />)
  wrapper.find('button').simulate('click')
  expect(wrapper.find('div.dropdown-layout').length).toBe(1)
  expect(wrapper.find('div.show').length).toBe(1)
})
