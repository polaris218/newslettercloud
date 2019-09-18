import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import { compose } from 'redux'
import get from 'lodash/get'

import DraftListContainer from './DraftListContainer'
import { connectResource } from 'common/utils/resource'
import { checkAccountStatus } from 'common/utils/helpers'


const views = {
  public: {
    type: 'public',
    responsive: 2,
  },
  own: {
    type: 'personal',
  },
  advanced: {}
}

class NewDraft extends Component {
  state = {
    view: 'public',
    filters: views['public'],
  }

  changeView = (e) => {
    this.setState({ view: e.currentTarget.id, filters: views[e.currentTarget.id] })
  }

  componentWillUnmount() {
    this.props.personalDrafts.setData(null)
  }

  render() {
    const isFree = checkAccountStatus(this.props.profile)
    return (
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <h1><FormattedMessage id="mails.createMail" /></h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <nav className="nav gan-nav-tabs mb-5">
              <button
                className={`nav-link btn btn-link ${this.state.view === 'public' && 'active'}`}
                id="public"
                onClick={this.changeView}>
                <FormattedMessage id="mails.publicTemplates" />
              </button>
              {
                !!get(this.props.personalDrafts, 'data.length') &&
                <button
                  className={`nav-link btn btn-link ${this.state.view === 'own' && 'active'}`}
                  id="own"
                  onClick={this.changeView}>
                  <FormattedMessage id="mails.ownTemplates" />
                </button>
              }
              {
                !isFree &&
                <button
                  className={`nav-link btn btn-link ${this.state.view === 'advanced' && 'active'}`}
                  id="advanced"
                  onClick={this.changeView}>
                  <FormattedMessage id="mails.advancedTemplates" />
                </button>
              }
            </nav>
          </div>
        </div>
        <DraftListContainer {...this.state} history={this.props.history} profile={this.props.profile} />
      </div>
    )
  }
}

export default compose(
  connectResource({
    namespace: 'profile',
    async: true,
    prefetch: false,
  }),
  connectResource({
    namespace: 'personalDrafts',
    endpoint: 'mails/templates/block',
    async: true,
    filters: {
      type: 'personal',
    },
    list: true,
    item: false,
  }),
)(NewDraft)
