import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import LoginDetails from './LoginDetailsContainer'
import AccountOwner from './AccountOwner'


export default class ProfilePartial extends Component {
  state = {
    showOptions: 'login'
  };

  switchOptions = event => {
    this.setState({ showOptions: event.currentTarget.dataset.option });
  };

  render() {
    const { showOptions } = this.state;

    return (
      <div className="row mb-3">
        <div className="col-3">
          <ul className="list-group">
            <li
              className={`list-group-item list-group-item-action ${showOptions === 'login' ? 'active' : ''}`}
              onClick={this.switchOptions}
              data-option="login"
            >
              <FormattedMessage id="profile.loginDetails" />
            </li>
            <li
              className={`list-group-item list-group-item-action ${showOptions === 'owner' ? 'active' : ''}`}
              onClick={this.switchOptions}
              data-option="owner"
            >
              <FormattedMessage id="profile.accountOwner" />
            </li>
          </ul>
        </div>
        <div className="col-9">
          {this.state.showOptions === 'login' ? <LoginDetails /> : <AccountOwner />}
        </div>
      </div>
    );
  }
}
