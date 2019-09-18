import React from 'react'
import { FormattedMessage } from 'react-intl'


export default function ChooseActionHeader({ contacts, countOfContacts}) {

  const { count = 0, filter, filters, resetFilters } = contacts
  if(!filters.updated_gt && !filters.active && !filters.lists && !filters.not_subscribed && !filters.search) {
    return (
      <>
        <FormattedMessage id="contacts.numberOf" />
        <strong className="ml-1">{count}</strong>
      </>
    )
  } else {
    return (
      <>
      <FormattedMessage
        id="contacts.yourFilteredResult"
        values={{
          firstNum: count,
          secNum: countOfContacts,
          type: 'contacts'
        }}
      />
      <button className="btn-none p-0 pointer ml-1"
              onClick={() => {
                resetFilters({
                  paginate_by: filters.paginate_by, page: 1})
                filter()
              }}
      >
        <span className="link-underline font-weight-bold"><FormattedMessage id="contacts.resetFilters"/></span>
      </button>
      </>
    )
  }
}
