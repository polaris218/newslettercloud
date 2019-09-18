import * as React from "react";
import PropTypes from 'prop-types';
import Button from '../Button';

export default class Mail extends React.Component {
  static propTypes = {
    model: PropTypes.shape({
      data: PropTypes.shape({mail_name: PropTypes.string})
    })
  };

  static defaultProps = {
    model: {data: {mail_name: ''}}
  };

  render() {
    return (
      <div>
        <h2>This is test Mail with name: <span style={{color: 'gray'}}>{this.props.model.data.mail_name}</span></h2>
        <Button />
      </div>
    );
  }
}
