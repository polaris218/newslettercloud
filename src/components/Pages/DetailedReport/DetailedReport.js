import React from 'react'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Link, Redirect } from 'react-router-dom'

import OverviewPartial from './partials/OverviewPartial'
import RecipientsPartial from './partials/RecipientsPartial'
import LinksPartial from './partials/LinksPartial'
import BouncesPartial from './partials/BouncesPartial/BouncesPartialContainer'
import { partial } from 'lib/utils'
import { Dropdown } from 'common/widgets'
import ModalTrigger from 'modals/ModalTrigger'
import ExportReportModal from './ExportReportModal'
import RemoveReportModal from 'components/Pages/Reports/RemoveReportModal'
import PreviewModal from 'modals/components/PreviewModal'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { getDefaultDate } from 'common/utils/formatDate'
import SendToSubscribersModal from './SendToSubscribersModal'


const tabs = [
  { name: <FormattedMessage id="affiliate.overview.title" />, value: 'overview', component: OverviewPartial },
  { name: <FormattedMessage id="detailedReport.links.recipients" />, value: 'recipients', component: RecipientsPartial },
  { name: <FormattedMessage id="detailedReport.links.links" />, value: 'links', component: LinksPartial },
  { name: <FormattedMessage id="detailedReport.links.bounces" />, value: 'bounces', component: BouncesPartial }
]

const TabNavigation = ({ onTabClick, currentValue }) => {
  return (
    <nav className="nav gan-nav-tabs mb-5">
      {tabs.map(tab => (
        <button
          className={`nav-link btn btn-link ${currentValue === tab.value ? 'active' : ''}`}
          key={tab.value}
          onClick={partial(onTabClick, tab.value)}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  )
}

export default function DetailedReport({ onTabClick, report: { data: report, isLoading, errors, fetch }, tabKey, id, history }) {
  if(get(errors, '_error') === 'Not found.') {
    return <Redirect exact to="/reports" />
  }
  if(!report) {
    report = {}
  }
  const TabView = tabs.find(i => i.value === tabKey).component
  return (
    <div className="container">
      <div className="row align-items-center mb-4">
        <div className="col-md-9">
          <h1>{report.mail_subject || '\u00A0'}</h1>
          {
            report.sent &&
            <span>
              <FormattedMessage id="detailedReport.sent" values={{ sent: getDefaultDate(report.sent), sentTo: report.delivered }} />
              <Link to={{
                pathname: '/lists',
                state: { showModal: true, id: get(report, 'sent_to_lists[0].hash') }
              }}>
                {get(report, 'sent_to_lists[0].name')}
              </Link>
            </span>
          }
        </div>
        <div className="col-md-3 d-flex justify-content-end">
          <Dropdown
            disableButtonIcon={true}
            buttonContent={<span><FormattedMessage id="detailedReport.toggle.share" /> <FontAwesomeIcon className="ml-2" icon="caret-down" /></span>}
            buttonClasses="btn btn-secondary"
          >
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${report.share_url}`} className="dropdown-item" target="_blank"><FormattedMessage id="detailedReport.share.facebook" /></a>
            <a href={`http://twitter.com/home?status=Check%20out%20our%20newsletter%20at%20${report.share_url}`} className="dropdown-item" target="_blank"><FormattedMessage id="detailedReport.share.twitter" /></a>
            <a href={`https://www.linkedin.com/shareArticle?url=${report.share_url}&source=Get a Newsletter`} className="dropdown-item" target="_blank"><FormattedMessage id="detailedReport.share.linkedin" /></a>
            <a href={report.share_url} className="dropdown-item" target="_blank"><FormattedMessage id="detailedReport.share.online" /></a>
          </Dropdown>
          <Dropdown
            disableButtonIcon={true}
            buttonContent={<span><FormattedMessage id="common.actions" /> <FontAwesomeIcon className="ml-2" icon="caret-down" /></span>}
            buttonClasses="btn btn-secondary ml-3"
          >
            <ModalTrigger
              component={PreviewModal}
              id={report.mail_id}
            >
              <div className="dropdown-item">
                <FontAwesomeIcon className="fa-md mr-2" icon="eye" />
                <FormattedMessage id="detailedReport.actions.preview" />
              </div>
            </ModalTrigger>
            <ModalTrigger
              component={ExportReportModal}
              id={report.id}
            >
              <div className="dropdown-item">
                <FontAwesomeIcon className="fa-md mr-2" icon="chart-bar" />
                <FormattedMessage id="detailedReport.actions.export" />
              </div>
            </ModalTrigger>
            <ModalTrigger
              component={RemoveReportModal}
              id={report.id}
              name={report.mail_subject}
              redirectToList={true}
            >
              <div className="dropdown-item">
                <FontAwesomeIcon className="fa-md mr-2" icon="times" />
                <FormattedMessage id="detailedReport.actions.delete" />
              </div>
            </ModalTrigger>
            <ModalTrigger
              component={SendToSubscribersModal}
              id={id}
            >
              <div className="dropdown-item">
                <FontAwesomeIcon className="fa-md mr-2" icon="paper-plane" />
                <FormattedMessage id="reports.sendToSubscribers.btn" />
              </div>
            </ModalTrigger>
          </Dropdown>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TabNavigation onTabClick={onTabClick} currentValue={tabKey} />
        </div>
      </div>
      <TabView seeAll={onTabClick} data={report} isLoading={isLoading} id={id} />
    </div>
  )
}
