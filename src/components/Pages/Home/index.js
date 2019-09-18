import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { FontAwesomeIcon } from 'lib/font-awesome'
import AccountStatus from 'components/AccountStatus'
import MonthSummary from 'components/MonthSummary'
import LatestReport from 'components/LatestReport'
import HomeHeaderContainer from './HomeHeaderContainer'
import { PageTitle } from 'common/widgets'
import { connectResource } from 'common/utils/resource'
import { getDomain } from 'common/utils/helpers'


class HomePage extends PureComponent {
  state = {
    hideSteps: Cookies.get('hide-progress'),
  }

  dismissSteps = () => {
    this.setState({ hideSteps: true })
    Cookies.set('hide-progress', true, { domain: getDomain(null, true) })
  }

  render() {
    const firstName = get(this.props.user, 'data.first_name')
    return (
      <>
        {
          !this.state.hideSteps &&
          <HomeHeaderContainer dismissSteps={this.dismissSteps} {...this.state} />
        }
        <PageTitle title="title.dashboard"/>
        <div className="container">
        <div className="row mb-4">
            <div className="col">
              {
                this.state.hideSteps &&
                <h1><FormattedMessage id={`${firstName ? 'home.welcomeBack' : 'home.welcomeBackEmpty'}`} values={{ name: firstName }}/></h1>
              }
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div className="card-deck">
                <div className="card mw-25">
                  <div className="card-header">
                    <h5 className="card-title mb-0"><FormattedMessage id="home.quickLinks" /></h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">
                      <FontAwesomeIcon className="text-primary mr-2" icon="rocket" />
                      <Link to="/upgrade"><FormattedMessage id="home.upgrade" /></Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      <FontAwesomeIcon className="text-primary mr-2" icon="clipboard-list" />
                      <Link to={{
                        pathname: '/lists',
                        state: { showModal: true }
                      }} className="btn-link"><FormattedMessage id="home.createList" /></Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      <FontAwesomeIcon className="text-primary mr-2" icon="user-friends" />
                      <Link to="/contacts/import"><FormattedMessage id="home.importContacts" /></Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      <FontAwesomeIcon className="text-primary mr-2" icon="address-card" />
                      <Link to="/forms/regular/add"><FormattedMessage id="contacts.api.addForm" /></Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      <FontAwesomeIcon className="text-primary mr-2" icon="envelope" />
                      <Link to="/mails/drafts/new"><FormattedMessage id="home.createMail" /></Link>
                    </li>
                  </ul>
                </div>
                <LatestReport />
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col">
              <div className="card-deck">
                <div className="card">
                  <h5 className="card-header"><FormattedMessage id="home.currentSubscripton" /></h5>
                  <div className="card-body">
                    <AccountStatus isHomePage={true}/>
                  </div>
                </div>
                <MonthSummary />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default connectResource({
  namespace: 'user',
  endpoint: 'user',
  async: true,
  prefetch: false,
})(HomePage)
