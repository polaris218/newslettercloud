import React from 'react'

import PageFilterContainer from './PageFilterContainer'
import SubscriptionsTable from './SubscriptionsTable'
import { PageTitle } from 'common/widgets'


export default function Subscriptions({ checkedRows,
  handleCheckRow,
  searchText,
  checkAllRows,
  handleChangeSearch,
  clearCheckedRows,
  countOfSubscriptions,
}) {
  return (
    <>
    <PageTitle title="title.subscriptions"/>
    <PageFilterContainer
      searchText={searchText}
      handleChangeSearch={handleChangeSearch}
    />
    <SubscriptionsTable
      checkedRows={checkedRows}
      handleCheckRow={handleCheckRow}
      clearCheckedRows={clearCheckedRows}
      checkAllRows={checkAllRows}
      countOfSubscriptions={countOfSubscriptions}
    />
    </>
  )
}
