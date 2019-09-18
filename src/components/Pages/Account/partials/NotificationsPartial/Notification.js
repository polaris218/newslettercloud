import React from 'react'

import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import NotificationMessageContainer from './NotificationMessageContainer'


export default function Notification({ data, collapse, showContent }) {
  return (
    <div className="card">
      <div className="d-flex w-100 justify-content-between pointer card-header" id={data.url} onClick={showContent}>
        <h5 className="mb-0">{data.subject}</h5>
        <small className="text-muted">{getDefaultTypeDateAndTime(data.dispatch_date)}</small>
      </div>
      <NotificationMessageContainer data={data} className={`collapse collapsing ${collapse ? 'show' : ''}`} collapse={collapse} />
    </div>
  )
}
