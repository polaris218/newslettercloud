import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import Spinner from 'components/Spinner'
import { ChartLegend, ChartLegendItem } from 'components/ChartLegend'
import ClickedLegend from 'components/ClickedLegend'
import Chart from 'components/Chart'
import { partial } from 'lib/utils'
import { defaultPagination } from 'common/utils/constants'


const OVERVIEW_CHART_OPTIONS = { legend: false, responsive: true, maintainAspectRatio: false };

export default function OverviewChart({ overview, data: latestData, isLoading, seeAll = () => {}, ...restProps }) {
    const { overviewChart } = overview
    const { labels } = overviewChart.chart
    const dataset = overviewChart.chart.datasets[0]
    const { backgroundColor, data, subscribers } = dataset
    const activity = !!subscribers.filter(i => i && i).length
    let chart
    chart = <div className={`card ${restProps.className}`}>
      <h5 className="card-header">{restProps.title || <FormattedMessage id="affiliate.overview.title" />}</h5>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-5">
            <div className="chart-wrapper">
              <Chart type="doughnut" data={overviewChart.chart} options={OVERVIEW_CHART_OPTIONS} />
            </div>
          </div>
          <div className="col">
            <ChartLegend>
              <ChartLegendItem
                key={1}
                color={backgroundColor[0]}
                subscribers={subscribers[0]}
                label={labels[0]}
                value={data[0]}
                seeAll={partial(seeAll, 'recipients')}
              />
              <ChartLegendItem
                key={2}
                color={backgroundColor[1]}
                subscribers={subscribers[1]}
                label={labels[1]}
                value={data[1]}
                seeAll={(e) => seeAll('recipients', e, {
                  label: 'Did not open',
                  endpoint: 'have_not_opened',
                  filters: {
                    paginate_by: defaultPagination,
                  }
                })}
              />
              <ChartLegendItem
                key={3}
                color={backgroundColor[2]}
                subscribers={subscribers[2]}
                label={labels[2]}
                value={data[2]}
                seeAll={partial(seeAll, 'bounces')}
              />
            </ChartLegend>
          </div>
          {
            !restProps.disableClickedLegend &&
            <div className="col">
              <ClickedLegend data={overviewChart.clickedLegend} />
            </div>
          }
        </div>
        <Spinner show={isLoading} />
      </div>
    </div>

    if(!latestData) {
      chart =
      <div className={`card ${restProps.className}`}>
        <h5 className="card-header">{restProps.title || <FormattedMessage id="affiliate.overview.title" />}</h5>
        <div className="card-body d-flex align-items-center">
          <div className="text-center">
            <h5 className="mb-3"><FormattedMessage id="overviewChart.empty.title" /></h5>
            <p className="px-5">
              <FormattedMessage id="overviewChart.empty.text" />
            </p>
            <Link className="btn btn-success" to="/mails/drafts/new">
              <FormattedMessage id="home.createMail" />
            </Link>
          </div>
        </div>
      </div>
    }
    if(latestData && !activity) {
      chart =
      <div className={`card ${restProps.className}`}>
        <h5 className="card-header">{restProps.title || <FormattedMessage id="affiliate.overview.title" />}</h5>
        <div className="card-body d-flex align-items-center justify-content-center">
          <div className="text-center lead"> <FormattedMessage id="overviewChart.empty.noActivities" /></div>
        </div>
      </div>
    }
    if(restProps.dashboardView) { return chart }
    return (
      <div className="row mb-5">
        <div className="col">
          {chart}
        </div>
      </div>
    )
}
