import React from 'react'
import { Collapse } from 'reactstrap'


export default function NotificationMessage({ data, className, collapse }) {
  const messageMarkup = { __html: data.message }
  return (
    <Collapse isOpen={collapse}>
      <div className="card-body" dangerouslySetInnerHTML={messageMarkup} />
    </Collapse>
  )
}
