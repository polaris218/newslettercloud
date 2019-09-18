import React from 'react'
import { FormattedMessage } from 'react-intl'

import serviceStatus from '../../../services/status';


export function mapOverviewChart(report = {}) {
  const opened = report.unique_html_opened || 0;
  const bounced = report.bounced || 0;
  const delivered = report.delivered || 0;
  const unsubscribed = report.unsubscribed || 0;
  const clicked = report.receivers_who_clicked || 0;

  const opened_percentage = delivered ? +((opened / delivered) * 100).toFixed(2) : 0;
  const bounced_percentage = delivered ? +((bounced / delivered) * 100).toFixed(2) : 0;
  const not_opened_percentage = 100 - opened_percentage - bounced_percentage;

  const opened_users_count = opened;
  const bounced_users_count = bounced;
  const not_opened_users_count = delivered - bounced - opened;

  const cancelled_percentage = delivered ? +((unsubscribed / delivered) * 100).toFixed(2) : 0;
  const cancelled_users_count = unsubscribed;

  const clicked_percentage = delivered ? +((clicked / delivered) * 100).toFixed(2) : 0;
  const clicked_users_count = clicked;

  return {
    chart: {
      labels: [<FormattedMessage id="overview.opened" />, <FormattedMessage id="overview.notOpened" />, <FormattedMessage id="overview.bounced" />],
      datasets: [
        {
          backgroundColor: ['#3bb279', '#e7e271', '#df6565'],
          data: [opened_percentage, not_opened_percentage, bounced_percentage],
          subscribers: [opened_users_count, not_opened_users_count, bounced_users_count]
        }
      ]
    },
    clickedLegend: [
      {
        value: cancelled_percentage,
        label: <FormattedMessage id="overview.cancelled" />,
        subscribers: cancelled_users_count
      },
      {
        value: clicked_percentage,
        label: <FormattedMessage id="overview.clicked" />,
        subscribers: clicked_users_count
      }
    ]
  };
}

export function mapBounces(report = {}) {
  const bounced = report.bounced;
  const bounced_permanent = report.bounced_permanent || 0;
  const bounced_temporary = report.bounced_temporary || 0;
  const bounced_permanent_perc = bounced ? +((bounced_permanent / bounced) * 100).toFixed(2) : 0;
  const bounced_temporary_perc = bounced ? +(100 - bounced_permanent_perc).toFixed(2) : 0;

  return {
    bounced,
    chart: {
      labels: ['permanent bounces', 'temporary bounces'],
      datasets: [
        {
          backgroundColor: ['#3bb279', '#e7e271'],
          data: [bounced_permanent_perc, bounced_temporary_perc],
          subscribers: [bounced_permanent, bounced_temporary]
        }
      ]
    }
  };
}

export function mapOverview(report = {}) {
  const mail_subject = report.mail_subject || '';
  const sent = report.sent || '';
  const list = (report.sent_to_lists && report.sent_to_lists[0]) || '';
  const delivered = report.delivered || 0;
  const clicked = report.receivers_who_clicked || 0;
  const clicked_daily = report.receivers_who_clicked_24h || 0;
  const clicked_percentage = delivered ? +((clicked / delivered) * 100).toFixed(1) : 0;
  const clicked_daily_percentage = delivered ? +((clicked_daily / delivered) * 100).toFixed(1) : 0;

  return {
    reportId: report.id || 0,
    subject: mail_subject,
    delivered,
    list: list,
    sent: sent,
    status: serviceStatus.LOADING,
    overviewChart: mapOverviewChart(report),
    bouncesChart: mapBounces(report),
    clicked_percentage,
    clicked_daily_percentage,
    share_url: report.share_url,
    preview_url: report.preview_url,
    type: report.type,
  };
}

export default {
  create: mapOverview,
  NULL: mapOverview({})
};
