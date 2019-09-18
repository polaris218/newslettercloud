import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import findLastKey from 'lodash/findLastKey'

import { Table, Column, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { getDefaultDate, getDefault24TypeDateAndTime } from 'common/utils/formatDate'
import { getCheckedLists } from 'common/utils/helpers'
import ChooseAction from './ChooseAction'
import ChooseActionHeader from './ChooseActionHeader'
import EmptyList from 'components/EmptyList'
import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'
import ModalTrigger from 'modals/ModalTrigger'
import ModalAddContact from 'components/Pages/Contacts/IndexPage/partials/ContactsPartial/ModalAddContact'


function PlaceholderComponent({ filter, filters }) {
  if(!filters.updated_gt && !filters.cancelled && !filters.lists  && !filters.search_email) {
    return (
      <EmptyList
        placeholderTitle={<FormattedMessage id="contacts.subscription.title" />}
        placeholderDescription={<FormattedMessage id="contacts.subscription.description" />}
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
                className="w-25 mb-5"
                src="/img/empty.svg"
              />
              <h3><FormattedMessage id={(findLastKey(filters, filter => filter) === 'search_email')
                ? "contacts.noSearchInSearch"
                : "contacts.noResultsInFilter"} /></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function SubscriptionsTable({ subscriptions, checkedRows, handleCheckRow, clearCheckedRows, checkAllRows, countOfSubscriptions }) {
  let { data: list, isLoading, count, filter, filters } = subscriptions
  
  list = list ? list : []
  let subscriptionsToRender = []  
  subscriptionsToRender = list.map(sub=>(sub['id']))
  const actionableList = checkedRows.length ? getCheckedLists(checkedRows) : subscriptionsToRender
  return (
    <>
    <div className="row mb-4">
      <div className="col">
        <div className="card bg-light">
          <div className="card-header">
            <ChooseActionHeader subscriptions={subscriptions} countOfSubscriptions={countOfSubscriptions}/>
          </div>
          <div className="card-body">
            <ChooseAction
              checkedSubscriptions={actionableList}
              onSubmitCallback={() => {
                return filter({
                  ...filters, page:1
                })
                  .then(_ => clearCheckedRows())
              }}
              isLoading={isLoading}
              checkAllRows={checkAllRows}
              count={subscriptions.count}
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
      itemsType={<FormattedMessage id="common.subscriptions" />}
    >
      <Column
        field="id"
        title={<input type="checkbox"
        checked={(getCheckedLists(checkedRows).length == filters.paginate_by) || count === getCheckedLists(checkedRows).length}
                      onChange={(ev) => checkAllRows(ev.target.checked)}
        />}
        width="46px"
        className="text-center"
        mockData="12"
        format={(id) => {
          return (
            <input
              type="checkbox"
              checked={checkedRows[id] || false}
              onChange={(ev) => {
                handleCheckRow(id)
              }}
            />
          )

        }}
      />
      <Column
        field="contact"
        title={<FormattedMessage id="subscriptions.table.contact" />}
        width="34%"
        format={(email) => <Link to={`/contacts/${email}`}>{email}</Link>}
      />
      <Column
        field="list_name"
        title={<FormattedMessage id="subscriptions.table.list" />}
        format={(list_name,{ list }) => <Link to={{
          pathname: '/lists',
          state: { editModal: true, id: list }
        }}>{list_name}</Link>}
      />
      <Column
        field="cancelled"
        title={<FormattedMessage id="subscriptions.table.status" />}
        width="8%"
        mockData="actions"
        format={(cancelled, item) => (
          <TooltipContent className="tooltip--subscriptions" tooltipText={
            item.cancelled ?
            `Cancelled the subscription ${getDefault24TypeDateAndTime(item.cancelled)}` :
            `Created the subscription ${getDefault24TypeDateAndTime(item.created)}`
          }>
            <FontAwesomeIcon
              icon={cancelled ? 'times' : 'check'}
              className={cancelled ? 'text-danger' : 'text-success'}
            />
          </TooltipContent>
        )}
      />
      <Column
        field="created"
        title={<FormattedMessage id="subscriptions.table.created" />}
        width="10%"
        format={(time) => getDefaultDate(time)}
      />
      <Column
        field="cancelled"
        title={<FormattedMessage id="subscriptions.table.cancelled" />}
        width="10%"
        format={(time) => time && getDefaultDate(time)}
      />
      <Column
        field="responders"
        title={<FormattedMessage id="subscriptions.table.autoresponder" />}
        format={(lists, item) => {
          // const subscriptions = lists && lists.length && lists.map((item, ind) => (
          //     <div key={item.name + ind}>
          //       <FontAwesomeIcon
          //         icon={'check'}
          //         className={'text-success mr-2'}
          //       />
          //       {item.name}
          //     </div>
          //   ))
          // return subscriptions || ''
          return ''
        }}
      />
    </Table>
    </>
  )
}

export default React.memo(connectResource({
  namespace: 'subscriptions',
  endpoint: 'subscriptions',
  prefetch: false,
  useRouter: true,
  list: true,
})(SubscriptionsTable))
