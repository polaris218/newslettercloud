import * as React from 'react';
import PropTypes from "prop-types";
import Button from '../Button';

export default class Form extends React.Component {
  static propTypes = {
    model: PropTypes.shape({
      data: PropTypes.shape({ form_name: PropTypes.string })
    })
  };

  static defaultProps = {
    model: { data: { form_name: '' } }
  };
  render() {
    return (
      <div>
        <h2>I'm a dummy Form with name: {this.props.model.data.form_name}</h2>
        <Button />
      </div>
    );
  }
}
