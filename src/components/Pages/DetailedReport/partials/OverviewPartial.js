import React from 'react'
import { FormattedMessage } from 'react-intl'

import OpeningsAndClicks from 'components/Pages/DetailedReport/OpeningsAndClicks/OpeningsAndClicksContainer'
import MostActiveRecipients from 'components/Pages/DetailedReport/MostActiveRecipients/MostActiveRecipientsContainer'
import PopularLinks from 'components/Pages/DetailedReport/PopularLinks/PopularLinksContainer'
import OverviewChart from 'components/Pages/DetailedReport/OverviewChart/OverviewChartContainer'
import BouncesChart from 'components/Pages/DetailedReport/BouncesChart/BouncesChartContainer'


export default function OverviewPartial({ isLoading, data, seeAll, id }) {
  return (
    <div>
      <OverviewChart data={data} seeAll={seeAll} isLoading={isLoading} />
      {
        data.type !== 1 &&
        <OpeningsAndClicks id={id} />
      }
      <div className="row mb-5">
        <div className="col">
          <h5 className="mb-3"><FormattedMessage id="detailedReport.bounces.mostActive" /></h5>
          <MostActiveRecipients seeAll={(e) => seeAll('recipients', e)} id={id} />
        </div>
        <div className="col">
          <h5 className="mb-3"><FormattedMessage id="detailedReport.bounces.popularLinks" /></h5>
          <PopularLinks seeAll={(e) => seeAll('links', e)} id={id} />
        </div>
      </div>
      <BouncesChart data={data} seeAll={(e) => seeAll('bounces', e)} isLoading={isLoading} />
    </div>
  )
}
