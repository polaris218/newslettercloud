import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column, PageTitle, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import MailsTableLayout from 'components/Pages/Mails/IndexPage/partials/MailsTableLayout'


export default function SentList({ withoutTitle, showOnly, showMorePath, ...props }) {
  if(showOnly && !get(props.sentList.data, 'length')) return null
  return (
    <MailsTableLayout
      title="title.sentMails"
      heading={<FormattedMessage id="title.sentMails" />}
      withoutTitle={withoutTitle}
    >
      <Table
        list={{ results: props.sentList.data }}
        isLoading={props.sentList.isLoading}
        paginationLimit={props.sentList.filter.paginate_by}
        paginationCount={props.sentList.count}
        paginationOnChange={data => props.sentList.filter({page:data.currentIndex})}
        showOnly={showOnly}
        showMorePath={showMorePath}
        itemsType={<FormattedMessage id="sent.table.items" />}
      >
        <Column
          field="subject"
          title={<FormattedMessage id="sent.table.subject" />}
          format={(value, item) =>
            <ModalTrigger component={PreviewModal} id={item.mail}>
              <button className="btn btn-link text-left">{value}</button>
            </ModalTrigger>
          }
        />
        <Column
          field="time_to_send"
          title={<FormattedMessage id="sent.table.sent" />}
          format={(value) =>
            <span>{getDefaultTypeDateAndTime(value)}</span>
          }
        />
        <Column
          field="lists"
          title={<FormattedMessage id="sent.table.list" />}
          format={(value) =>
            value.map((i, index) => <span className="table-list-block" key={i.name}>{i.name} {index < value.length - 1}</span>)
          }
        />
        <Column
          title={<FormattedMessage id="sent.table.actions" />}
          width="25%"
          format={(_, item) =>
            <div className="d-flex">
              <TooltipContent tooltipText={<FormattedMessage id="reports.previewMail" />} iconType>
                <ModalTrigger component={PreviewModal} id={item.mail}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="reports.copyMail" />} iconType>
                <FontAwesomeIcon className="fa-md text-primary pointer" icon="copy" onClick={() => props.copyDraft(item)} />
              </TooltipContent>
                {item.report_id &&
                  <TooltipContent tooltipText={<FormattedMessage id="reports.view" />} iconType>
                    <Link to={`/reports/${item.report_id}`}>
                      <FontAwesomeIcon className="fa-md text-primary pointer" icon="signal" />
                    </Link>
                  </TooltipContent>
                }
                <TooltipContent tooltipText={<FormattedMessage id="mails.pending.delete" />}>
                  <ModalConfirmationTrigger
                    title={<FormattedMessage id="common.areYouSure" />}
                    message={<FormattedMessage id="mail.delete.areYouSure" values={{ subject: item.subject }} />}
                    onConfirm={() => props.removeSent(item)}
                    checkboxAction={() => props.removeReport(item.report_id)}
                    checkboxActionText={<FormattedMessage id="autoresponder.table.deleteReport" />}
                  >
                    <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                  </ModalConfirmationTrigger>
                </TooltipContent>
            </div>
          }
        />
      </Table>
    </MailsTableLayout>
  )
}
