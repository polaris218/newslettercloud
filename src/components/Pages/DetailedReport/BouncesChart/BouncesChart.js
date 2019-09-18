import React from 'react'
import { FormattedMessage } from 'react-intl'

import { ChartLegend, ChartLegendItem } from 'components/ChartLegend'
import Chart from 'components/Chart'
import Spinner from 'components/Spinner'


const CHART_OPTIONS = { legend: false, maintainAspectRatio: false };

export default function BouncesChart({ overview, seeAll, isLoading }) {
  const { bouncesChart } = overview
  const { labels } = bouncesChart.chart
  const dataset = bouncesChart.chart.datasets[0]
  const { backgroundColor, data, subscribers } = dataset

  return (
    <div className="row mb-5">
      <div className="col">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0"><FormattedMessage id="detailedReport.bounces.title" /></h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                {bouncesChart.bounced ? (
                  <div className="row">
                    <div className="col-md-6 col-lg-4">
                      <div className="chart-wrapper">
                        <Chart type="doughnut" data={bouncesChart.chart} options={CHART_OPTIONS} />
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-4 d-flex justify-content-center">
                      <ChartLegend>
                        <ChartLegendItem
                          key={1}
                          color={backgroundColor[0]}
                          subscribers={subscribers[0]}
                          label={labels[0]}
                          value={data[0]}
                        />
                        <ChartLegendItem
                          key={2}
                          color={backgroundColor[1]}
                          subscribers={subscribers[1]}
                          label={labels[1]}
                          value={data[1]}
                        />

                        <div className="mt-4">
                          <button className="btn btn-sm btn-secondary" onClick={seeAll}>
                            <FormattedMessage id="detailedReport.bounces.seeAll" />
                          </button>
                        </div>
                      </ChartLegend>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-8 offset-2 text-center my-4">
                          <img
                            alt=""
                            className="w-25 mb-5"
                            src="/img/empty.svg"
                          />
                          <h3><FormattedMessage id="detailedReport.bounces.goodJob" /></h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Spinner show={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
