import React, { Component } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { toast } from 'react-toastify'
import { FormattedMessage } from 'react-intl'

import { connectFormResource } from 'common/utils/resource'
import GeneralSettings from './GeneralSettings'


class GeneralSettingsContainer extends Component {
  onSubmit = (e) => {
    this.props.profile.update(e)
      .then(_ => this.props.profile.fetch())
      .then(_ => toast.success(<FormattedMessage id="toasters.profile.updated" />))
  }

  render() {
    return <GeneralSettings {...this.props} onSubmit={this.onSubmit} />
  }
}

export default compose(
  connectFormResource({
    namespace: 'profile',
    endpoint: 'profile',
    async: true,
    prefetch: false,
  }),
  reduxForm({
    form: 'profile',
  })
)(GeneralSettingsContainer)
