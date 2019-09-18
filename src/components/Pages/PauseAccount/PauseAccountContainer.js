import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'

import PauseAccount from './PauseAccount'
import { connectResource } from 'common/utils/resource'


class PauseAccountContainer extends Component {
  state = {
    confirm: false,
  }

  pauseAccount = () => {
    this.props.pause.create()
      .then(_ => this.setState({ confirm: false }))
      .then(_ => this.props.profile.fetch())
      .then(_ => toast.success(<FormattedMessage id="toasters.account.paused" />))
  }

  activateAccount = () => {
    this.props.activate.create()
      .then(_ => this.setState({ confirm: false }))
      .then(_ => this.props.profile.fetch())
      .then(_ => toast.success(<FormattedMessage id="toasters.account.activated" />))
  }

  confirmPause = (e) => {
    this.setState({ confirm: !this.state.confirm })
  }

  render() {
    return <PauseAccount {...this.props} pauseAccount={this.pauseAccount} activateAccount={this.activateAccount} confirmPause={this.confirmPause} {...this.state} />
  }
}

export default compose(
  connectResource({
    namespace: 'pause',
    endpoint: 'profile/pause-subscription',
    prefetch: false,
    async: true,
  }),
  connectResource({
    namespace: 'activate',
    endpoint: 'profile/unpause-subscription',
    prefetch: false,
    async: true,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    prefetch: false,
    async: true,
  }),
)(PauseAccountContainer)
