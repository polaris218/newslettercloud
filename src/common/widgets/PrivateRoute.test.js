import React from 'react'
import { shallow } from 'enzyme'

import PrivateRoute from './PrivateRoute'

const defaultProps = {
 needRedirect: true,
 children: <div>PrivateRoute is correct</div>,
 redirectTo: '/home',
}


it('renders without crashing', () => {
  shallow(<PrivateRoute />)
})

it('needRedirect works correct', () => {
  const wrapper =  shallow(<PrivateRoute {...defaultProps}/>)
  expect(wrapper.find('div').props().children).toEqual('PrivateRoute is correct')
})

