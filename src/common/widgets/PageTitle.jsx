import React from 'react'
import { injectIntl } from 'react-intl'


class PageTitle extends React.Component {

  componentDidMount() {
    const id = this.props.title || 'title.default'
    document.title = this.props.intl.formatMessage({ id }) + ' | Get a Newsletter'
  }

  render() {
    return null
  }
}

export default injectIntl(PageTitle)
