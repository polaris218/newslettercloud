import React from 'react'
import { shallow, mount } from 'enzyme'

import SearchCheckedHoc from './SearchCheckedHoc'


it('renders without crashing', () => {
  shallow(<SearchCheckedHoc />)
})
