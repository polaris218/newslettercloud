import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'

import { noop } from 'lib/utils'
import PageSearch from 'components/PageSearch'
import FilterRadio from 'components/FilterRadio'
import { yearAgo, monthAgo, weekAgo } from 'common/utils/formatDate'


export default React.memo(function PageFilter({ subscriptions, searchText, handleChangeSearch, lists, openFilters, toggleFilters }) {

  const { filter, filters, isLoading } = subscriptions
  return (
    <>
    <div className="row mb-2">
      <div className="col-5">
        <PageSearch
          onSearch={() => filter({ ...filters, page: null, search_email: searchText })}
          disabled={isLoading}
          value={searchText}
          onChange={handleChangeSearch}
        />
      </div>
      <div className="col-2">
        <button className="btn btn-outline-secondary" onClick={toggleFilters}>
          <FormattedMessage id="contacts.filter" />
        </button>
      </div>
    </div>
    { openFilters && <div className="row">
        <div className="col">
          <div className="card border-bottom-0">
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-3">
                  <p className=" mb-2 font-weight-bold"><FormattedMessage id="contacts.subscription.filter" /></p>
                  <FilterRadio
                    name="created_gt"
                    value={filters.created_gt}
                    items={[
                      { name: <FormattedMessage id="contacts.radio.showAllSubscriptions" />, value: '' },
                      { name: <FormattedMessage id="contacts.radio.last7Days" />, value: weekAgo() },
                      { name: <FormattedMessage id="contacts.radio.last30Days" />, value: monthAgo() },
                      { name: <FormattedMessage id="contacts.radio.last365Days" />, value: yearAgo() }
                    ]}
                    onChange={(field, value) => filter({ ...filters, page:null, created_gt: value  })}
                  />
                </div>
                <div className="col-3">
                  <p className="mb-2 font-weight-bold"><FormattedMessage id="contacts.subscription.cancelled" /></p>
                  <FilterRadio
                    name="cancelled"
                    value={filters.cancelled}s
                    items={[
                      { name: <FormattedMessage id="contacts.radio.showAllSubscriptions" />, value: '' },
                      { name: <FormattedMessage id="contacts.radio.notCancelled" />, value: '0' },
                      { name: <FormattedMessage id="contacts.radio.cancelled" />, value: '1' }
                    ]}
                    onChange={(field, value) => filter({ ...filters, page:null, cancelled: value  })}
                  />
                </div>
                <div className="col-6">
                  <p className="font-weight-bold"><FormattedMessage id="contacts.filterByList" /></p>
                  <Select
                  disabled={lists.isLoading || !lists.data}
                  isLoading={lists.isLoading || !lists.data}
                  placeholder={<FormattedMessage id="contacts.showAllContacts" />}
                  options={lists.data}
                  onChange={(value) => {
                    const query = !value ? undefined : value.reduce((str, item, ind, arr) => {
                      const postFix = ind+1 !== arr.length ? ',' : ''
                      return str + item.hash + postFix
                    }, '')
                    filter({ ...filters, lists: query, page:null })
                  }}
                  isMulti={true}
                  maxMenuHeight={300}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  className="react-select"
                  getOptionLabel={(option) => option['name']}
                  getOptionValue={(option) => option['hash']}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
})
