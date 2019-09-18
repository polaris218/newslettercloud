import * as React from "react";

export default class Mail extends React.Component {
  render() {
    return (
      <div> This is test Mail with name: {this.props.mail_name}</div>
    );
  }
}
