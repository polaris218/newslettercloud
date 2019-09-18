import React from 'react'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { FontAwesomeIcon } from 'lib/font-awesome'
import UpgradeSubscriptionContainer from './UpgradeSubscriptionContainer'
import UpgradeInformation from './UpgradeInformationContainer'
import UpgradeSummary from './UpgradeSummaryContainer'
import { PageTitle } from 'common/widgets'


export default function UpgradePage(props) {

  return (
    <div className="container-wrap">
      <PageTitle title="title.upgradeAccount"/>
      <div className="start-hero mb-5">
        <div className="container">
          <div className="row mb-4 justify-content-between align-items-center">
            <div className="col-4">
              <img alt="upgrade account" src="/img/upgrade.svg" />
            </div>
            <div className="col-7">
              <h1 className="mb-4"><FormattedMessage id="upgrade.upgradeAccount" /></h1>
              <p className="lead mb-4"><FormattedMessage id="upgrade.youNeverPayMore" /></p>
              <FontAwesomeIcon className="text-success mr-2 fa-lg" icon="check-circle" />
              <span className="font-weight-bold mr-5"><FormattedMessage id="upgrade.alwaysTheRightPrice" /></span>

              <FontAwesomeIcon className="text-success mr-2 fa-lg" icon="check-circle" />
              <span className="font-weight-bold mr-5"><FormattedMessage id="upgrade.noEntryFee" /></span>

              <FontAwesomeIcon className="text-success mr-2 fa-lg" icon="check-circle" />
              <span className="font-weight-bold"><FormattedMessage id="upgrade.freeSupport" /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Route exact path="/upgrade" component={UpgradeSubscriptionContainer} />
        <Route exact path="/upgrade/information" component={UpgradeInformation} />
        <Route exact path="/upgrade/summary" component={UpgradeSummary} />
      </div>
    </div>
  )
}
