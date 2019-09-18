import React from 'react';
import { shallow } from 'enzyme';
import ConnectFields from './ConnectFields';
import { SelectField } from 'common/forms/fields'

const connectOptions = [
  { label: 'John', value: 'field1' },
  { label: 'email@email.com', value: 'field2' },
  { label: 'email@email.com', value: 'field2' },
]

const attributes = {
  data: [
    {code: 'age', name: 'Age'},
    {code: 'gender', name: 'Gender'},
    {code: 'city', name: 'City'},
  ]
}

it('renders without crashing', () => {
  shallow(<ConnectFields />);
});

it("if only connectOptions props available", () => {
  const wrapper = shallow(<ConnectFields connectOptions={connectOptions} />)
  expect(wrapper.find(SelectField).length).toBe(3);
});

it("if both props available", () => {
  const wrapper = shallow(<ConnectFields connectOptions={connectOptions} attributes={attributes} />)
  expect(wrapper.find(SelectField).length).toBe(6);
});
