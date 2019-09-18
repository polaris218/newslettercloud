import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import findLastKey from 'lodash/findLastKey'

import { Table, Column, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { getDefault24TypeDateAndTime } from 'common/utils/formatDate'
import { getCheckedLists } from 'common/utils/helpers'
import ChooseAction from './ChooseAction'
import ChooseActionHeader from './ChooseActionHeader'
import ModalTrigger from 'modals/ModalTrigger'
import ModalAddContact from './ModalAddContact'
import EmptyList from 'components/EmptyList'
import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'


function PlaceholderComponent({ filter, filters }) {
  if(!filters.updated_gt && !filters.active && !filters.lists && !filters.not_subscribed  && !filters.search) {
    return (
      <EmptyList
        placeholderTitle={<FormattedMessage id="contacts.placeholder.title" />}
        placeholderDescription={<FormattedMessage id="contacts.placeholder.description" />}
      >
        <div className="text-center" >
          <ModalTrigger
            component={ModalAddContact}
            onHide={() => filter(filters)}
          >
            <button type="button" className="btn btn-light">
              <FormattedMessage id="contacts.addContact.title" />
            </button>
          </ModalTrigger>
          <Link to="/contacts/import" className="btn btn-success ml-3">
            <FormattedMessage id="contacts.import.title" />
          </Link>
        </div>
      </EmptyList>
    )
  }
  return (
    <div className="row">
      <div className="col">
        <div className="card py-5">
          <div className="row">
            <div className="col-8 offset-2 text-center">
              <img
                alt=""
                className="w-25 mb-4"
                src="/img/empty.svg"
              />
              <h3><FormattedMessage id={(findLastKey(filters, filter => filter) === 'search')
                ? "contacts.noSearchInSearch"
                : "contacts.noResultsInFilter"} /></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function ContactsTable({ contacts, checkedRows, checkAllRows, handleCheckRow, clearCheckedRows, countOfContacts }) {
  let { data: list, isLoading, count, filter, filters } = contacts
  list = list ? list : []
  let contactsToRender = []  
  contactsToRender = list.map(contact=>(contact['email']))
  const actionableList = checkedRows.length ? getCheckedLists(checkedRows) : contactsToRender
  /* TODO: If no user is selected in this list, the Choose action component will still receive an empty list,
   and that might still trigger the action on all the users*/
  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <div className="card bg-light">
            <div className="card-header">
              <ChooseActionHeader contacts={contacts} countOfContacts={countOfContacts}/>
            </div>
            <div className="card-body">
              <ChooseAction
                checkedContacts={actionableList}
                checkAllRows={checkAllRows}
                onSubmitCallback={() => {
                  return filter({
                    ...filters, page:1
                  })
                    .then(_ => clearCheckedRows())
                }}
                isLoading={isLoading}
                count={contacts.count}
              />
            </div>
          </div>
        </div>
      </div>
      <Table
        list={{ results: list }}
        isLoading={isLoading}
        paginationLimit={filters.paginate_by}
        paginationCount={count}
        paginationOnChange={data => filter({page:data.currentIndex})}
        placeholderComponent={<PlaceholderComponent filter={filter} filters={filters} />}
        routerPage={filters.page}
        itemsType={<FormattedMessage id="common.contacts" />}
      >
        <Column
          field="email"
          title={<input type="checkbox"
          checked={(getCheckedLists(checkedRows).length == filters.paginate_by) || count === getCheckedLists(checkedRows).length}
                        onChange={(ev) => checkAllRows(ev.target.checked)}
          />}
          width="46px"
          className="text-center"
          mockData="12"
          format={(email) => {
            return (
              <input type="checkbox"
                    checked={checkedRows[email] || false}
                    onChange={(ev) => {
                      handleCheckRow(email)
                    }}
              />
            )

          }}
        />
        <Column
          field="email"
          title={<FormattedMessage id="contacts.table.email" />}
          width="34%"
          format={(email) => <Link to={`/contacts/${email}`}>{email}</Link>}
        />
        <Column
          field="first_name"
          title={<FormattedMessage id="contacts.table.name" />}
          format={(name, item) => {
            return (
              `${item.first_name && item.first_name} ${item.last_name && item.last_name}`
            )

          }}
        />
        <Column
          field="lists"
          title={<FormattedMessage id="contacts.table.subscriptions" />}
          format={(lists, item) => {
            const subscriptions = lists && lists.length && lists.map((item, ind) => (
              <div key={item.name + ind}>
                <TooltipContent className="tooltip--subscriptions" tooltipText={
                  item.subscription_cancelled ?
                  `Cancelled the subscription ${getDefault24TypeDateAndTime(item.subscription_cancelled)}` :
                  `Created the subscription ${getDefault24TypeDateAndTime(item.subscription_created)}`
                }>
                  <FontAwesomeIcon
                    icon={`${item.subscription_cancelled ? 'times' : 'check'}`}
                    className={item.subscription_cancelled ? 'text-danger mr-2' : 'text-success mr-1'}
                  />
                  {item.name}
                </TooltipContent>
              </div>
              ))
            return subscriptions || ''
          }}
        />
        <Column
          field="updated"
          title={<FormattedMessage id="contacts.table.updated" />}
          format={(time) => getDefault24TypeDateAndTime(time)}
        />
        <Column
          field="active"
          title={<FormattedMessage id="contacts.table.active" />}
          width="8%"
          mockData="actions"
          format={(active) => (
            <FontAwesomeIcon
              icon={active ? 'check' : 'times'}
              className={active ? 'text-success mr-2' : 'text-danger mr-2'}
            />
          )}
        />
      </Table>
    </>
  )
}

export default React.memo(connectResource({
  namespace: 'contacts',
  endpoint: 'contacts',
  prefetch: false,
  useRouter: true,
  list: true,
})(ContactsTable))
