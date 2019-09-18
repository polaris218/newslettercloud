import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column, Dropdown, PageTitle, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import ReplanScheduledModal from 'modals/components/ReplanScheduledModal'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import MailsTableLayout from 'components/Pages/Mails/IndexPage/partials/MailsTableLayout'


export default function AutorespondersList({ withoutTitle, showOnly, showMorePath, ...props }) {
  if(showOnly && !get(props.scheduledList.data, 'length')) return null
  return (
    <MailsTableLayout
      title="title.scheduledMails"
      heading={<FormattedMessage id="title.scheduledMails" />}
      withoutTitle={withoutTitle}
    >
      <Table
        list={{ results: props.scheduledList.data }}
        isLoading={props.scheduledList.isLoading}
        paginationLimit={props.scheduledList.filters.paginate_by}
        paginationCount={props.scheduledList.count}
        paginationOnChange={data => props.scheduledList.filter({page:data.currentIndex})}
        showMorePath={showMorePath}
        showOnly={showOnly}
        itemsType={<FormattedMessage id="scheduled.table.items" />}
      >
        <Column
          field="subject"
          title={<FormattedMessage id="scheduled.table.subject" />}
          format={(value, item) =>
            <ModalTrigger component={PreviewModal} id={item.mail}>
              <button className="btn btn-link text-left">{value}</button>
            </ModalTrigger>
          }
        />
        <Column
          field="time_to_send"
          title={<FormattedMessage id="scheduled.table.isSent" />}
          format={(value) =>
            <span>{getDefaultTypeDateAndTime(value)}</span>
          }
        />
        <Column
          field="lists"
          title={<FormattedMessage id="scheduled.table.list" />}
          format={(value) =>
            value.map((i, index) => <span key={i.name}>{i.name} {index < value.length - 1 && ','}</span>)
          }
        />
        <Column
          title={<FormattedMessage id="scheduled.table.actions" />}
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
              <TooltipContent tooltipText={<FormattedMessage id="scheduled.table.pause" />} iconType>
                <ModalConfirmationTrigger
                  title={<FormattedMessage id="common.areYouSure" />}
                  message={<FormattedMessage id="scheduled.table.stopMessage" />}
                  onConfirm={() => props.stopScheduled(item)}
                >
                  <FontAwesomeIcon className="fa-md text-danger pointer" icon="stop" />
                </ModalConfirmationTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="scheduled.table.replan" />}>
                <ModalTrigger component={ReplanScheduledModal} id={item.id} onHide={props.scheduledList.fetch}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="clock" />
                </ModalTrigger>
              </TooltipContent>
            </div>
          }
        />
      </Table>
    </MailsTableLayout>
  )
}
