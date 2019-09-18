import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column } from 'common/widgets'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import OverpaidInvoiceModal from './OverpaidInvoiceModalContainer'
import PaymentModal from 'modals/components/PaymentModal'
import { getPaymentUrl } from 'common/utils/helpers'


export default function Invoices({ invoices }) {
  if(!get(invoices, 'data.length')) return null
  return (
    <div className="row mb-2">
      <div className="col">
        <h2 className="mb-3"><FormattedMessage id="account.billingHistory" /></h2>
        <div className="relative">
        <Table
          list={{ results: invoices.data }}
          paginationLimit={invoices.filters.paginate_by}
          paginationCount={invoices.count}
          isLoading={invoices.isLoading}
          paginationOnChange={data => invoices.filter({page:data.currentIndex})}
          itemsType={<FormattedMessage id="invoices.table.items" />}
        >
          <Column
            field="invoice_number"
            title={<FormattedMessage id="invoices.table.invoiceNo" />}
            width="15%"
          />
          <Column
            field="due_date"
            title={<FormattedMessage id="invoices.table.dueDate" />}
            format={(_, item) =>
              <span>{getDefaultTypeDateAndTime(item.due_date)}</span>
            }
            width="20%"
          />
          <Column
            field="total_amount"
            title={<FormattedMessage id="invoices.table.amount" />}
            format={(_, item) =>
              <span>{item.total_amount} {item.currency}</span>
            }
          />
          <Column
            field="payment"
            title={<FormattedMessage id="invoices.table.payment" />}
            width="20%"
            format={(_, item) =>
              <span>
                {
                  item.payment === 'Not Paid' ? (
                    <>
                    <FontAwesomeIcon icon="times" className="text-danger mr-2" />
                      <ModalTrigger component={PaymentModal} id={item.id} filters={{
                        order_id: item.order_id,
                        accepturl: getPaymentUrl(`upgrade/pay-by-card/accept/`),
                      }} >
                        <button className="btn btn-link"><FormattedMessage id="invoices.payCard" /></button>
                      </ModalTrigger>
                    </>
                  ) : (
                    <>
                    {
                      item.balance < 0 && item.total_amount > 0 ?
                      <>
                      <FontAwesomeIcon icon="times" className="text-danger mr-2" />
                        <span>
                          <span><FormattedMessage id="invoices.overpaid" /></span><br />
                          {
                            item.repayment_status === 'not paid' ?
                            <ModalTrigger component={OverpaidInvoiceModal} id={item.id} onHide={invoices.fetch} isSuccess={true}>
                              <button className="btn btn-link"><FormattedMessage id="invoices.pending" /></button>
                            </ModalTrigger> :
                            <ModalTrigger component={OverpaidInvoiceModal} id={item.id} onHide={invoices.fetch}>
                              <button className="btn btn-link"><FormattedMessage id="invoices.resolve" /></button>
                            </ModalTrigger>
                          }
                        </span>
                      </> :
                      <>
                        <FontAwesomeIcon icon="check" className="text-success mr-2" />
                        <span>{item.payment}</span>
                      </>
                    }
                    </>
                  )
                }
              </span>
            }
          />
          <Column
            field="download_url"
            title={<FormattedMessage id="invoices.table.actions" />}
            format={(_, item) =>
              <a href={item.download_url} download><FormattedMessage id="common.download" /></a>
            }
          />
          <Column
            field="note"
            title={<FormattedMessage id="invoices.table.notes" />}
          />
        </Table>
      </div>
      </div>
    </div>
  )
}
