import React from 'react';
import { shallow } from 'enzyme';
import AddRegularForm from './AddRegularForm';
import { CheckboxField } from 'common/forms/fields'


const defaultProps = {
  handleSubmit: () => {},
  onSubmit: () => {},
  forms: {
    loading: 0,
  },
  advanced: false,
}

const attributes = {
  data: [
    {code: 'one', name: 'One'},
    {code: 'two', name: 'Two'},
    {code: 'three', name: 'Three'},
  ]
}


it('renders without crashing', () => {
  shallow(<AddRegularForm {...defaultProps} />);
});

it("Advanced fields visible", () => {
  const wrapper = shallow(<AddRegularForm {...defaultProps} advanced={true} />)
  expect(wrapper.find('#advanced').length).toBe(1);
});

it("Attributes fields hidden", () => {
  const wrapper = shallow(<AddRegularForm {...defaultProps} attributes={[]} />)
  expect(wrapper.find('#attributes').length).toBe(0);
});

it("Attributes fields hidden", () => {
  const wrapper = shallow(<AddRegularForm {...defaultProps} attributes={[]} />)
  expect(wrapper.find('#attributes').length).toBe(0);
});

it("Attributes fields showed", () => {
  const wrapper = shallow(<AddRegularForm {...defaultProps} attributes={attributes} />)
  expect(wrapper.find('#attributes').find(CheckboxField).length).toBe(3);
});
