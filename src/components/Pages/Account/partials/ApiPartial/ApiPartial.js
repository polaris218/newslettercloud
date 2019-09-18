import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ApiTokensContainer from './ApiTokensContainer'
import ApiPlugins from './ApiPlugins'


export default class ApiPartial extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-3">
            <div className="list-group">
              <NavLink
                to="/account/api"
                exact
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <FormattedMessage id="apiTokens.title" />
              </NavLink>
              <NavLink
                to="/account/api/plugins"
                exact
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <FormattedMessage id="apiTokens.plugins" />
              </NavLink>
            </div>
        </div>
        <Route exact path="/account/api" component={ApiTokensContainer} />
        <Route exact path="/account/api/plugins" component={ApiPlugins} />
      </div>
    );
  }
}
