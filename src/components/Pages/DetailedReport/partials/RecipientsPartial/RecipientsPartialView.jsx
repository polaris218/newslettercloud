import React from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { Table, Column } from 'common/widgets'
import Select from 'react-select'
import { defaultPagination } from 'common/utils/constants'
import ExportReportModal from 'components/Pages/DetailedReport/ExportReportModal'
import ModalTrigger from 'modals/ModalTrigger'
import EmptyList from 'components/EmptyList'


export const FILTER_OPTIONS = [
  { 
    label: 'Opened',
    value: {
      endpoint: 'most_active_customers',
      filters: {
        ordering: "-opens,-clicks,contact[email]",
        paginate_by: defaultPagination,
        page:1,
      },
    },
  },
  { 
    label: 'Did not open',
    value: {
      endpoint: 'have_not_opened',
      filters: {
        paginate_by: defaultPagination,
        page:1,
      }
    } 
  },
  { 
    label: 'Cancelled',
    value: {
      endpoint: 'unsubscribed',
      filters: {
        ordering: "-opens,-clicks,contact[email]",
        paginate_by: defaultPagination,
        page:1,
      }
    } 
  },
];

function PlaceholderComponent({ optionValue }) {
  const text = {
    placeholderTitle: 'List is empty',
    placeholderDescription: '',
  }
  switch(optionValue.label) {
    case 'Cancelled':
      text.placeholderTitle = <FormattedMessage id="recipients.cancelled.title" />
      text.placeholderDescription = <FormattedMessage id="recipients.cancelled.description" />
      break;

    case 'Opened':
      text.placeholderTitle = <FormattedMessage id="recipients.opened.title" />
      text.placeholderDescription = <FormattedMessage id="recipients.opened.description" />
      break;
  }
  return <EmptyList {...text} />
}


export default function RecipientsPartialView ({ recipients, optionValue, id, ...props }) {
  return (
    <>
    <div className="row mb-2">
      <div className="col-6">
        <Select
          options={FILTER_OPTIONS}
          onChange={(option) => {
            props.history.push({
              state: { ...option.value, label: option.label, tabKey: 'recipients' }
            })
          }}
          value={optionValue}
        />
      </div>
      <ModalTrigger
        component={ExportReportModal}
        endpoint="most_active_customers/export"
        id={id}
      >
        <button className="btn btn-primary mb-3" disabled={!get(recipients, 'data.length')}>
          <FormattedMessage id="contacts.options.export" />
        </button>
      </ModalTrigger>
    </div>
    <div className="row">
      <div className="col">
        <Table
          list={{ results: recipients.data }}
          isLoading={recipients.isLoading}
          paginationLimit={recipients.filters.paginate_by}
          paginationCount={recipients.count}
          routerPage={recipients.filters.page}
          paginationOnChange={data => recipients.filter({page:data.currentIndex})}
          placeholderComponent={<PlaceholderComponent optionValue={optionValue} />}
        >
          <Column
            field="contact"
            title={'Email'}
            length="40%"
            format={(value, item) =>
              item.contact_url ? <Link to={item.contact_url}>{value}</Link> : value
            }
          />
          <Column
            field="opens"
            title={'Openings'}
          />
          <Column
            field="clicks"
            title={'Link Clicks'}
            format={value => value || 0}
          />        
        </Table>
      </div>
    </div>
    </>
  )
}