import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Cookies from 'js-cookie'

import { FontAwesomeIcon } from 'lib/font-awesome'
import AppBarNav from 'components/AppBarNav'
import { connectResource } from 'common/utils/resource'
import { getDomain } from 'common/utils/helpers'
import './styles.scss';


class AppBar extends Component {
  static propTypes = {
    user: PropTypes.shape({ data: PropTypes.shape({ id: PropTypes.number }) })
  };

  static defaultProps = {
    user: { data: { id: 0 } }
  };

  state = {
    showNav: false,
  };

  toggleNav = () => {
    this.setState({ showNav: !this.state.showNav });
  };

  render() {
    const profileData = get(this.props, 'profile.data') || {}
    const userData = get(this.props, 'user.data') || {}
    return (
      <header className="site-header mb-5 br-dark">
        <div className="beta-bar">
          <p><FormattedMessage id="header.privateBeta" /> <a href={`https://${getDomain()}`} onClick={ev=> {
            ev.preventDefault()
            Cookies.remove('isBeta', { domain: getDomain() })
            window.location.href = `https://${getDomain()}`
          }}><FormattedMessage id="header.goBack" /></a>  <FormattedMessage id="header.toOld" /> <button className="btn-link" onClick={() =>   this.props.history.push({
            state: { openFeedback: true },
          })}> <FormattedMessage id="header.sendFeedback" /></button></p>
        </div>
        <div className="container header-bg">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to="/" className="navbar-brand mr-4">
              <img alt="" src="/img/logo.svg" />
            </Link>
            <button className="navbar-toggler" type="button" onClick={this.toggleNav}>
              <span className="navbar-toggler-icon" />
            </button>
            {this.props.session && userData.id ? <AppBarNav show={this.state.showNav} /> : null}
          </nav>
        </div>
        {
          get(profileData, 'subscription.on_hold_since') &&
          <div className="header-info header-info--blue header-info--static">
            <FontAwesomeIcon className="mr-2 fa-md" icon="exclamation-triangle" />
            Your account is currently paused and you need to activate it in order to send mails again. <Link to="/account/pause">Activate your account</Link>
          </div>
        }
        {
          profileData.email_confirmation_needed &&
          <div className="header-info header-info--red relative">
            <FontAwesomeIcon className="mr-2 fa-md" icon="exclamation-triangle" />
            <FormattedMessage id="emailConfirmation.message" />: <Link to="/email-confirmation"><FormattedMessage id="emailConfirmation.title" /></Link>
          </div>
        }
      </header>
    );
  }
}

export default compose(
  withRouter,
  connect(state => ({ session: get(state, 'resource.session.data.token') })),
  connectResource({
    namespace: 'user',
    endpoint: 'user',
    async: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'profile',
    endpoint: 'profile',
    async: true,
    prefetch: false,
  }),
)(AppBar);
