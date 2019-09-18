import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { PageTitle } from 'common/widgets'


export default function MailsTableLayout({ showHeading = true, ...props }) {
  return (
    <div className="row mb-5">
      {
        !props.withoutTitle &&
        <PageTitle title={props.title} />
      }
      <div className="col">
        {
          showHeading &&
          <div className="row align-items-center mb-4">
            <div className="col">
              <h3 className={`mb-0 ${props.withoutTitle ? 'mt-0' : ''}`}>{props.heading}</h3>
            </div>
          </div>
        }
        {props.children}
      </div>
    </div>
  )
}
