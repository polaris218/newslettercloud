import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { FontAwesomeIcon } from 'lib/font-awesome'
import { Table, Column } from 'common/widgets'
import ExportReportModal from 'components/Pages/DetailedReport/ExportReportModal'
import ModalTrigger from 'modals/ModalTrigger'


const EmptyState = () => (
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
            <h3><FormattedMessage id="detailedReport.bounces.goodJob" /></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function BouncesPartial({ bounces, id }) {
  return (
    <>
      <div className="row">
        <div className="col text-right">
          <ModalTrigger
            component={ExportReportModal}
            endpoint="bounces/export"
            id={id}
          >
            <button className="btn btn-primary mb-3" disabled={!get(bounces, 'data.length')}>
              <FormattedMessage id="contacts.options.export" />
            </button>
          </ModalTrigger>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <Table
          list={{ results: bounces.data }}
          paginationLimit={bounces.filters.paginate_by}
          paginationCount={bounces.count}
          isLoading={bounces.isLoading}
          paginationOnChange={data => bounces.filter({ page: data.currentIndex })}
          placeholderComponent={<EmptyState/>}
        >
          <Column
            field="contact_active"
            title="Active"
            width="7%"
            format={value =>
              <FontAwesomeIcon icon={value ? 'check' : 'times'} className={value ? 'text-success' : 'text-danger'} />}
          />
          <Column
            field="contact"
            title="Email"
            format={(value, item) =>
              item.contact_url ? <Link to={item.contact_url}>{value}</Link> : value
            }
          />
          <Column
            field="error_type"
            title="Type"
          />
          <Column
            field="description"
            title="Description"
          />
        </Table>
        </div>
      </div>
    </>
  )
}
