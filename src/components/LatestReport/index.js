import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'

import OverviewChart from 'components/Pages/DetailedReport/OverviewChart/OverviewChartContainer';
import { connectResource } from 'common/utils/resource'

class LatestReport extends PureComponent {
  componentWillUnmount() {
    this.props.report.setData(null)
  }

  render() {
    const latestNewsletter = get(this.props.report, 'data[0].mail_subject')
    return (
      <OverviewChart
        data={get(this.props.report, 'data[0]')}
        disableClickedLegend={true}
        dashboardView={true}
        title={<FormattedMessage id="dashboard.latestNewsletter" values={{ data: latestNewsletter ? '- ' + latestNewsletter : '' }} /> }
        className="dashboard-chart"
        isLoading={this.props.report.isLoading}
      />
    )
  }
}

export default connectResource({
  namespace: 'report',
  endpoint: 'reports',
  filters: {
    ordering: '-sent',
    paginate_by: 1,
    min_opens: 1,
  },
  list: true,
  async: true,
})(LatestReport)
