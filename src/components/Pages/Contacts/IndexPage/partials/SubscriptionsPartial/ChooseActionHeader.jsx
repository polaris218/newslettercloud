import React from 'react'
import { FormattedMessage } from 'react-intl'


export default function ChooseActionHeader({ subscriptions, countOfSubscriptions}) {

  const { count = 0, filter, filters, resetFilters } = subscriptions
  if(!filters.created_gt && !filters.cancelled && !filters.lists) {
    return (
      <>
        <FormattedMessage id="subscriptions.numberOf" />
        <strong className="ml-1">{count}</strong>
      </>
    )
  } else {
    return (
      <>
        <FormattedMessage
          id="subscriptions.yourFilteredResult"
          values={{
            firstNum: count,
            secNum: countOfSubscriptions,
            type: 'subscriptions'
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
