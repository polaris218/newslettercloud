import React from 'react';
import { shallow } from 'enzyme';
import ImportFromFile from './ImportFromFile';
import ConnectFields from './ConnectFields';
import { SelectField } from 'common/forms/fields';
import Success from './Success';

const defaultProps = {
  handleSubmit: () => {},
  onSubmit: () => {},
  onCancel: () => {},
  fileData: {
    file: {},
    options: [],
  },
  options: [],
  files: {
    data: {
      summary: {

      }
    }
  }
}

const attributes = {
  data: [
    { code: '123', name: 'Name' },
    { code: '321', name: 'Name2' },
  ]
}


it('renders without crashing', () => {
  shallow(<ImportFromFile {...defaultProps} />);
});

it("ConnectFields visible", () => {
  const wrapper = shallow(<ConnectFields attributes={attributes} />)
  expect(wrapper.find(SelectField).length).toBe(5);
});

it("Success block visible", () => {
  const wrapper = shallow(<ImportFromFile {...defaultProps} finishImport={true} />)
  expect(wrapper.find(Success).length).toBe(1);
});
