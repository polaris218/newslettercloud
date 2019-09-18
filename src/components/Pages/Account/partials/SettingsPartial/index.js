import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import GeneralSettingsContainer from './GeneralSettingsContainer'
import PartnersContainer from './PartnersContainer'


export default class SettingsPartial extends Component {
  state = { showPartners: false }

  onTabClick = event => {
    this.setState({ showPartners: !!event.target.dataset.showPartners })
  }

  render() {
    const { showPartners } = this.state;

    return (
      <div className="row mb-3">
        <div className="col-3">
          <ul className="list-group">
            <li
              className={`list-group-item list-group-item-action ${!showPartners ? 'active' : ''}`}
              onClick={this.onTabClick}
            >
              <FormattedMessage id="settings.generalSettings" />
            </li>
            <li
              className={`list-group-item list-group-item-action ${showPartners ? 'active' : ''}`}
              onClick={this.onTabClick}
              data-show-partners="true"
            >
              <span className="pointer-events"><FormattedMessage id="settings.partners" /></span>
            </li>
          </ul>
        </div>
        <div className="col-9">{showPartners ? <PartnersContainer /> : <GeneralSettingsContainer />}</div>
      </div>
    )
  }
}
