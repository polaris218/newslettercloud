import React from 'react'
import { FormattedMessage } from 'react-intl'

import { partial } from 'lib/utils'
import Chart from 'components/Chart'
import Spinner from 'components/Spinner'
import { openings_chart_options } from 'common/utils/constants'


export default function OpeningsAndClicks({
  report,
  isLoading,
  uniqueDailyOpenings,
  uniqueAllOpenings,
  onNavBtnClick,
  chartData,
  dataIndex,
}) {
  if(!report.data) {
    report.data = {}
  }
  const openingsDailyRate = report.data.delivered ? ((uniqueDailyOpenings / report.data.delivered) * 100).toFixed(1) : 0
  const openingsAllRate = report.data.delivered ? ((uniqueAllOpenings / report.data.delivered) * 100).toFixed(1) : 0

  return (
    <div className="row mb-5">
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="mb-0"><FormattedMessage id="detailedReport.openings.title" /></h5>
              </div>
              <div className="col">
                <ul className="nav nav-tabs card-header-tabs justify-content-end">
                  <li className="nav-item">
                    <button
                      className={`nav-link btn btn-link ${dataIndex === 0 ? 'active' : 0}`}
                      onClick={partial(onNavBtnClick, 0)}
                    >
                      <FormattedMessage id="detailedReport.openings.first" />
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link btn btn-link ${dataIndex === 1 ? 'active' : 0}`}
                      onClick={partial(onNavBtnClick, 1)}
                    >
                      <FormattedMessage id="detailedReport.openings.all" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Chart
              type="line"
              data={chartData[dataIndex]}
              options={openings_chart_options}
            />
          </div>
          <div className="card-footer p-0 bg-transparent">
            <div className="row">
              <div className="col border-right">
                <div className="row p-4">
                  <div className="col"><FormattedMessage id="detailedReport.openings.openings" /></div>
                  <div className={`col ${dataIndex === 0 ? 'font-weight-bold' : 'text-muted'}`}>
                    <p className="m-0"><FormattedMessage id="detailedReport.openings.first" /></p>
                    <p className="m-0">{openingsDailyRate}%</p>
                  </div>
                  <div className={`col ${dataIndex === 1 ? 'font-weight-bold' : 'text-muted'}`}>
                    <p className="m-0"><FormattedMessage id="detailedReport.openings.all" /></p>
                    <p className="m-0">{openingsAllRate}%</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row p-4">
                  <div className="col"><FormattedMessage id="detailedReport.openings.rate" /></div>
                  <div className={`col ${dataIndex === 0 ? 'font-weight-bold' : 'text-muted'}`}>
                    <p className="m-0"><FormattedMessage id="detailedReport.openings.first" /></p>
                    <p className="m-0">{openingsDailyRate}%</p>
                  </div>
                  <div className={`col ${dataIndex === 1 ? 'font-weight-bold' : 'text-muted'}`}>
                    <p className="m-0"><FormattedMessage id="detailedReport.openings.all" /></p>
                    <p className="m-0">{openingsAllRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Spinner show={isLoading} />
        </div>
      </div>
    </div>
  )
}
