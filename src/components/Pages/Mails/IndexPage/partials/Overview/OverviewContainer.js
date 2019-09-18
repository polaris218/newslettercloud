import React, { Component } from 'react'

import DraftList from 'components/Pages/Mails/IndexPage/partials/Draft/DraftListContainer'
import StoppedList from 'components/Pages/Mails/IndexPage/partials/Stopped/StoppedListContainer'
import PendingList from 'components/Pages/Mails/IndexPage/partials/Pending/PendingListContainer'
import ScheduledList from 'components/Pages/Mails/IndexPage/partials/Scheduled/ScheduledListContainer'
import AutorespondersList from 'components/Pages/Mails/IndexPage/partials/Autoresponders/AutorespondersListContainer'
import SentList from 'components/Pages/Mails/IndexPage/partials/Sent/SentListContainer'


export default class OverviewContainer extends Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <StoppedList withoutTitle={true} overviewMode={true} isDraft={false} showOnly={5} showMorePath="/mails/stopped" history={history} />
        <PendingList withoutTitle={true} overviewMode={true} showOnly={5} showMorePath="/mails/pending" history={history} />
        <DraftList withoutTitle={true} overviewMode={true} showOnly={5} showMorePath="/mails/drafts" history={history} />
        <ScheduledList withoutTitle={true} overviewMode={true} showOnly={5} showMorePath="/mails/scheduled" history={history} />
        <AutorespondersList withoutTitle={true} overviewMode={true} showOnly={5} showMorePath="/mails/autoresponders" history={history} />
        <SentList withoutTitle={true} overviewMode={true} showOnly={5} showMorePath="/mails/sent" history={history} />
      </div>
    )
  }
}
