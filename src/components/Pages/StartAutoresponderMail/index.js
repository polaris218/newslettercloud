import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
// import PropTypes from 'prop-types';

export default class StartAutoresponderMail extends Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <h1><FormattedMessage id="autoresponderMail.start" /></h1>
          </div>
        </div>
      </div>
    )
  }
}
