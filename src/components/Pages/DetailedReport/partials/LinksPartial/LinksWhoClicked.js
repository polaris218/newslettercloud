import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column } from 'common/widgets'
import { defaultPagination } from 'common/utils/constants'
import ExportReportModal from 'components/Pages/DetailedReport/ExportReportModal'
import ModalTrigger from 'modals/ModalTrigger'


export default function LinksTable ({ linkClicked, handleCheckClick, id, link_id, ...props }) {
  return (
    <>
    <div className="row mb-2">
      <div className="col-6">
      </div>
      <div className="col-6 text-right">
        <button className="btn btn-primary mr-2" onClick={handleCheckClick(null)}><FormattedMessage id="detailedReport.links.back" /></button>
        <ModalTrigger
          component={ExportReportModal}
          endpoint={`most_active_customers/export`}
          params={{link_id}}
          id={id}
        >
          <button className="btn btn-primary" disabled={!get(linkClicked, 'data.length')}>
            <FormattedMessage id="contacts.options.export" />
          </button>
        </ModalTrigger>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <Table
          list={{ results: linkClicked.data }}
          isLoading={linkClicked.isLoading}
          paginationLimit={linkClicked.filters.paginate_by}
          paginationCount={linkClicked.count}
          paginationOnChange={data => linkClicked.filter({page:data.currentIndex})}
        >
          <Column
            field="contact_url"
            title={'Email'}
            length="40%"
            format={(value, item) => value ? <a href={value} target="_blank">{item.contact}</a> : item.contact}
          />
          <Column
            field="opens"
            title={'Openings'}
          />
          <Column
            field="clicks"
            title={'Link Clicks'}
          />
        </Table>
      </div>
    </div>
    </>
  )
}
