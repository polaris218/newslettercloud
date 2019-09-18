import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Table, Column } from 'common/widgets'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'


export default function AffiliatePayouts({ payouts }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          <FormattedMessage id="affiliate.payouts.title" />
        </h4>
        <p>
        <FormattedMessage id="affiliate.payouts.description" />
        </p>
        <Table
          list={{ results: payouts.data }}
          isLoading={payouts.isLoading}
          paginationLimit={payouts.filters.paginate_by}
          paginationCount={payouts.count}
          paginationOnChange={data => payouts.filter({page:data.currentIndex})}
        >
          <Column
            field="invoice_number"
            title="Invoice no"
          />
          <Column
            field="due_date"
            title="Latest payout date"
            format={(value) => <span>{getDefaultTypeDateAndTime(value)}</span>}
          />
          <Column
            field="download_url"
            title="Download"
            format={(value, item) =>
              <span>
                <a href={item.affiliate_specification_url} target="_blank"><FormattedMessage id="affiliate.payouts.downloadSpec" /></a>
                <br />
                <a href={value}><FormattedMessage id="affiliate.payouts.downloadInvoice" /></a>
              </span>
            }
          />
          <Column
            field="payment"
            title="Status"
          />
        </Table>
      </div>
    </div>
  )
}
