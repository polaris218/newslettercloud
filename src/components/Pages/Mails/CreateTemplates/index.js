import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import get from 'lodash/get'

import TemplatesListContainer from './TemplatesListContainer'
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
  advanced_editor: {
    type: 'personal',
  }
}

class NewTemplate extends Component {
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
            <h1><FormattedMessage id="mails.createTemplate" /></h1>
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
                  className={`nav-link btn btn-link ${this.state.view === 'advanced_editor' && 'active'}`}
                  id="advanced_editor"
                  onClick={this.changeView}>
                  <FormattedMessage id="mails.advancedEditor" />
                </button>
              }
            </nav>
          </div>
        </div>
        {
          this.state.view !== 'advanced_editor' ?
            <TemplatesListContainer {...this.state} profile={this.props.profile} /> :
            <div className="row">
              <div className="col-3 mb-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <div className="builder-icon">{`<>`}</div>
                  </div>
                  <div className="card-body text-center d-flex flex-column bg-light border-top">
                    <h5 className="card-title mb-3"><FormattedMessage id="templates.startFromScratch" /></h5>
                    <Link className="btn btn-success" to='/mails/templates/advanced/detail'><FormattedMessage id="common.select" /></Link>
                  </div>
                </div>
              </div>
            </div>
        }
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
)(NewTemplate)
