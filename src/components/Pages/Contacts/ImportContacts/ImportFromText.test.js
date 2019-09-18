import React from 'react';
import { shallow } from 'enzyme';
import ImportFromText from './ImportFromText';
import ConnectFields from './ConnectFields';
import Summary from './Summary';

const defaultProps = {
  handleSubmit: () => {},
  onSubmit: () => {},
  onCancel: () => {},
  fileData: {
    file: {},
    options: [],
  },
  options: [],
}


it('renders without crashing', () => {
  shallow(<ImportFromText {...defaultProps} />);
});

it("ConnectFields visible", () => {
  const wrapper = shallow(<ImportFromText {...defaultProps} connectFieldsView={true} />)
  expect(wrapper.find(ConnectFields).length).toBe(1);
});

it("Summary block visible", () => {
  const wrapper = shallow(<ImportFromText {...defaultProps} connectFieldsView={true} summary={true} />)
  expect(wrapper.find(Summary).length).toBe(1);
});
