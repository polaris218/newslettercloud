import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'

export default class NotFoundPage extends PureComponent {
  render() {
    return (
      <div className="container">
        <h1><FormattedMessage id="page404.heading" /></h1>
      </div>
    )
  }
}
