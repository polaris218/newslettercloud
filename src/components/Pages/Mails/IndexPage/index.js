import React from 'react'
import { Route, NavLink, Link } from 'react-router-dom'
import { compose } from 'redux'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import PageSubNav from 'components/PageSubNav'
import Overview from './partials/Overview/OverviewContainer'
import Drafts from './partials/Draft/DraftListContainer'
import Autoresponders from './partials/Autoresponders/AutorespondersListContainer'
import Scheduled from './partials/Scheduled/ScheduledListContainer'
import Sent from './partials/Sent/SentListContainer'
import Stopped from './partials/Stopped/StoppedListContainer'
import Pending from './partials/Pending/PendingListContainer'
import ListTemplates from './partials/ListTemplates'
import { connectResource } from 'common/utils/resource'
import { PrivateRoute } from 'common/widgets'
import { defaultPagination } from 'common/utils/constants'


const IndexPage = (props) => (
  <div className="container">
    <div className="row mb-4">
      <div className="col-6">
        <h1><FormattedMessage id="common.mails" /></h1>
      </div>
      <div className="col-6 text-right">
        <Link to="/mails/drafts/new" className="btn btn-success">
          <FormattedMessage id="mails.drafts.add" />
        </Link>
      </div>
    </div>
    <PageSubNav>
      <NavLink exact to="/mails" className="nav-link">
        <FormattedMessage id="mails.overview" />
      </NavLink>
      {
        !!get(props.drafts, 'data.length') &&
        <NavLink exact to="/mails/drafts" className="nav-link">
          <FormattedMessage id="common.drafts" />
        </NavLink>
      }
      {
        !!get(props.autorespondersList, 'data.length') &&
        <NavLink exact to="/mails/autoresponders" className="nav-link">
          <FormattedMessage id="mails.autoresponders" />
        </NavLink>
      }
      {
        !!get(props.scheduledList, 'data.length') &&
        <NavLink exact to="/mails/scheduled" className="nav-link">
          <FormattedMessage id="mails.scheduledMails" />
        </NavLink>
      }
      {
        !!get(props.sentList, 'data.length') &&
        <NavLink exact to="/mails/sent" className="nav-link">
          <FormattedMessage id="mails.sentMails" />
        </NavLink>
      }
      {
        !!get(props.stoppedList, 'data.length') &&
        <NavLink exact to="/mails/stopped" className="nav-link">
          <FormattedMessage id="mails.stoppedMails" />
        </NavLink>
      }
      {
        !!get(props.pendingList, 'data.length') &&
        <NavLink exact to="/mails/pending" className="nav-link">
          <FormattedMessage id="mails.pendingMails" />
        </NavLink>
      }
      <NavLink exact to="/mails/templates" className="nav-link">
        <FormattedMessage id="mails.templates" />
      </NavLink>
    </PageSubNav>

    <Route exact path="/mails" component={Overview} />
    <PrivateRoute needRedirect={!!get(props.drafts, 'data.length')} redirectTo="/mails" exact path="/mails/drafts" component={Drafts} />
    <PrivateRoute needRedirect={!!get(props.autorespondersList, 'data.length')} redirectTo="/mails" exact path="/mails/autoresponders" component={Autoresponders} />
    <PrivateRoute needRedirect={!!get(props.scheduledList, 'data.length')} redirectTo="/mails" exact path="/mails/scheduled" component={Scheduled} />
    <PrivateRoute needRedirect={!!get(props.sentList, 'data.length')} redirectTo="/mails" exact path="/mails/sent" component={Sent} />
    <PrivateRoute needRedirect={!!get(props.stoppedList, 'data.length')} redirectTo="/mails" exact path="/mails/stopped" component={Stopped} />
    <PrivateRoute needRedirect={!!get(props.pendingList, 'data.length')} redirectTo="/mails" exact path="/mails/pending" component={Pending} />
    <Route exact path="/mails/templates" component={ListTemplates} />
  </div>
)

export default compose(
  connectResource({
    namespace: 'drafts',
    endpoint: 'mails/drafts/:id?',
    list: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'sentList',
    endpoint: 'mails/sent',
    list: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'scheduledList',
    endpoint: 'mails/scheduled',
    list: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'autorespondersList',
    endpoint: 'responders',
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'pendingList',
    endpoint: 'mails/pending_review',
    list: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    refresh: true,
  }),
  connectResource({
    namespace: 'stoppedList',
    endpoint: 'mails/stopped',
    list: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    refresh: true,
  })
)(IndexPage)
