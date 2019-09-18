import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column } from 'common/widgets'
import { defaultPagination } from 'common/utils/constants'
import ExportReportModal from 'components/Pages/DetailedReport/ExportReportModal'
import ModalTrigger from 'modals/ModalTrigger'


export default function LinksTable ({ reportsLinks, handleCheckClick, id, ...props }) {
  return (
    <>
    <div className="row mb-2">
      <div className="col-6">
      </div>
      <div className="col-6 text-right">
        <ModalTrigger
          component={ExportReportModal}
          endpoint="links/export"
          id={id}
        >
          <button className="btn btn-primary mb-3" disabled={!get(reportsLinks, 'data.length')}>
            <FormattedMessage id="contacts.options.export" />
          </button>
        </ModalTrigger>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <Table
          list={{ results: reportsLinks.data }}
          isLoading={reportsLinks.isLoading}
          paginationLimit={reportsLinks.filters.paginate_by}
          paginationCount={reportsLinks.count}
          routerPage={reportsLinks.filters.page}
          paginationOnChange={data => reportsLinks.filter({page:data.currentIndex})}
        >
          <Column
            field="link"
            title={'Link Url'}
            length="40%"
            format={(value) =><a href={value} target="_blank">{value}</a>}
          />
          <Column
            field="unique_clicks"
            title={'Unique Clicks'}
          />
          <Column
            field="percent_of_total"
            title={'% Of Total'}
          />
          <Column
            field="id"
            title={'Actions'}
            format={(value, item) => <button className="btn btn-sm btn-success" onClick={handleCheckClick(value)}><FormattedMessage id="detailedReport.links.see" /></button>}
          />
        </Table>
      </div>
    </div>
    </>
  )
}
