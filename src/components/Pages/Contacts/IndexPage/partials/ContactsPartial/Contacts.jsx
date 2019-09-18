import React from 'react'

import PageFilterContainer from './PageFilterContainer'
import ContactsTable from './ContactsTable'
import { PageTitle } from 'common/widgets'


export default function Contacts({ checkedRows,
 checkAllRows,
 handleCheckRow,
 searchText,
 handleChangeSearch,
 clearCheckedRows,
 countOfContacts,
}) {
  return (
    <>
      <PageTitle title="title.contacts"/>
      <PageFilterContainer
        searchText={searchText}
        handleChangeSearch={handleChangeSearch}
      />
      <ContactsTable
        checkedRows={checkedRows}
        handleCheckRow={handleCheckRow}
        clearCheckedRows={clearCheckedRows}
        checkAllRows={checkAllRows}
        countOfContacts={countOfContacts}
      />
    </>
  )
}
