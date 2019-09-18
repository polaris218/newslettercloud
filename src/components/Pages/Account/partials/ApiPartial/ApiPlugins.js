import React from 'react'
import { FormattedMessage } from 'react-intl'


export default function ApiPlugins() {
  return (
    <div className="col-9">
      <h2><FormattedMessage id="apiTokens.plugins" /></h2>
      <p><FormattedMessage id="apiTokens.pluginsDescriptions" /></p>
      <a href={process.env.REACT_APP_WORDPRESS_PLUGIN_LINK} className="btn btn-success" target="_blank">
        <FormattedMessage id="apiTokens.seeInstructions" />
      </a>
    </div>
  )
}
