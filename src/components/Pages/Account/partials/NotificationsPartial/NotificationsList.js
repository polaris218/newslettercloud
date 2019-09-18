import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import Spinner from 'components/Spinner'
import Notification from './Notification'
import EmptyList from 'components/EmptyList'
import ListsPartial from '../../../Contacts/IndexPage/partials/ListsPartial/ListsPartial';


export default function({ notifications, content, showContent, list, showNextPage, showPrevPage, view }) {
  if(!list.length) {
    return (
      <>
        <Spinner show={notifications.isLoading} />
        <EmptyList
          placeholderTitle={<FormattedMessage id="notifications.placeholder.title" />}
          placeholderDescription={<FormattedMessage id="notifications.placeholder.description" />}
        />
      </>
    )
  }
  return (
    <>
      <div className="accordion">
        {list.map(i => {
          return <Notification
            key={i.url}
            collapse={content === i.url}
            showContent={showContent}
            data={i}
          />
        })}
      </div>
      {
       (notifications.count > 100 && view === 'all' || (notifications.count > 100 && list.length >= 100 || notifications.filters.page !== 1)) &&
        <ul className="pagination justify-content-center noselect mt-4">
          <li className={`page-item ${notifications.filters.page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={showPrevPage}>
              <span>{'< Prev'}</span>
            </button>
          </li>
          <li className={`page-item ${notifications.count <= 100 || list.length < 100 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={showNextPage}>
              <span>{'Next >'}</span>
            </button>
          </li>
        </ul>
      }
      <Spinner show={notifications.isLoading} />
    </>
  )
}
