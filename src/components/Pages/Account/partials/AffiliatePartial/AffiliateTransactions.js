import React from 'react'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl';

import { Table, Column } from 'common/widgets'
import { transactionsType } from 'common/utils/helpers'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'


export default function ListsPartial({ transactions, transactionsList, profile, comission }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          <FormattedMessage id="affiliate.transactions.title" />
        </h4>
        <p>
          <FormattedMessage
            id="affiliate.transactions.description"
            values={{
              users: get(transactions, 'data.free_count', 0) + get(transactions, 'data.paid_count', 0),
              payed: get(transactions, 'data.paid_count', 0),
              summ: get(comission, 'data.commission_total', 0),
              currency: get(profile, 'data.currency_code'),
            }}
          />
        </p>
        <Table
          list={{ results: transactionsList.data }}
          isLoading={transactionsList.isLoading}
          paginationLimit={transactionsList.filters.paginate_by}
          paginationCount={transactionsList.count}
          paginationOnChange={data => transactionsList.filter({page:data.currentIndex})}
        >
          <Column
            field="date"
            title="Date"
            format={(value) => <span>{getDefaultTypeDateAndTime(value)}</span>}
          />
          <Column
            field="type"
            title="Type"
            format={(value) => <span>{transactionsType(value)}</span>}
          />
          <Column
            field="commission"
            title="Commission"
          />
          <Column
            field="paid"
            title="Paid"
            format={(value) => <span>{value || 'No'}</span>}
          />
        </Table>
      </div>
    </div>
  )
}