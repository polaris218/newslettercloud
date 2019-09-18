import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { renderToString } from 'react-dom/server'

import PageSearch from 'components/PageSearch'
import FilterRadio from 'components/FilterRadio'
import { yearAgo, monthAgo, weekAgo } from 'common/utils/formatDate'
import ModalTrigger from 'modals/ModalTrigger'
import ModalAddContact from './ModalAddContact'


export default React.memo(function PageFilter({ contacts, searchText, handleChangeSearch, lists, openFilters, toggleFilters, resetFilters }) {

  const { filter, filters, isLoading, ...restContactsProps } = contacts
  const { page, paginate_by, search, ...otherFilters } = filters
  const listsFromFilters = filters.lists && filters.lists.split(',')
  return (
    <>
      <div className="row mb-2">
        <div className="col-5">
          <PageSearch
            onSearch={() => filter({ ...filters, page: 1, search: searchText })}
            disabled={isLoading}
            value={searchText}
            onChange={handleChangeSearch}
          />
        </div>
        <div className="col-2 d-flex align-items-start">
          <button className="btn btn-outline-secondary" onClick={toggleFilters}>
            <FormattedMessage id="contacts.filter" />
          </button>
        </div>
        <div className="col-5 text-right" >
          <ModalTrigger
            component={ModalAddContact}
            onHide={_ => filter(filters)}
          >
            <button type="button" className="btn btn-light">
              <FormattedMessage id="contacts.addContact.title" />
            </button>
          </ModalTrigger>
          <Link to="/contacts/import" className="btn btn-success ml-3">
            <FormattedMessage id="contacts.import.title" />
          </Link>
        </div>
      </div>
      { openFilters && <div className="row">
        <div className="col">
          <div className="card border-bottom-0">
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-3">
                  <p className="mb-2 font-weight-bold"><FormattedMessage id="contacts.filterByActive" /></p>
                  <FilterRadio
                    name="active"
                    value={filters.active}
                    items={[
                      { name: <FormattedMessage id="contacts.radio.showAll" />, value: '' },
                      { name: <FormattedMessage id="contacts.radio.showActive" />, value: '1' },
                      { name: <FormattedMessage id="contacts.radio.showInactive" />, value: '0' }
                    ]}
                    onChange={(field, value) => filter({ ...filters, active: value, page: 1  })}
                  />
                </div>
                <div className="col-3">
                  <p className=" mb-2 font-weight-bold"><FormattedMessage id="contacts.filterByUpdated" /></p>
                  <FilterRadio
                    name="updated_gt"
                    value={filters.updated_gt}s
                    items={[
                      { name: <FormattedMessage id="contacts.radio.showAll" />, value: '' },
                      { name: <FormattedMessage id="contacts.radio.last7Days" />, value: weekAgo() },
                      { name: <FormattedMessage id="contacts.radio.last30Days" />, value: monthAgo() },
                      { name: <FormattedMessage id="contacts.radio.last365Days" />, value: yearAgo() }
                    ]}
                    onChange={(field, value) => filter({ ...filters, page:null, updated_gt: value  })}
                  />
                </div>
                <div className="col-6">
                  <p className="font-weight-bold"><FormattedMessage id="contacts.filterByList" /></p>
                  <Select
                    disabled={lists.isLoading || !lists.data}
                    isLoading={lists.isLoading || !lists.data}
                    placeholder={<FormattedMessage id="contacts.showAllContacts" />}
                    options={lists.data || []}
                    onChange={(value) => {
                      const query = !value ? undefined : value.reduce((str, item, ind, arr) => {
                        const postFix = ind+1 !== arr.length ? ',' : ''
                        return str + item.hash + postFix
                      }, '')
                      filter({ ...filters, lists: query, page:null, not_subscribed: null })
                    }}
                    isMulti={true}
                    maxMenuHeight={300}
                    isSearchable={true}
                    closeMenuOnSelect={false}
                    className="react-select"
                    getOptionLabel={(option) => option['name']}
                    getOptionValue={(option) => option['hash']}
                    value={(lists.data && listsFromFilters && lists.data.filter(list => listsFromFilters.some(listFromFilter => listFromFilter === list.hash))) || []}
                  />
                  <div className="mt-2">
                    <span className={`mt-2 font-weight-bold small link link-underline ${filters.not_subscribed ? 'active' : ''}`}
                      onClick={() => filter({ ...filter, not_subscribed: (filters.not_subscribed ? null : true), lists: null})}
                    >
                      <FormattedMessage id="contacts.showNotSubscribed" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>

  )
})
