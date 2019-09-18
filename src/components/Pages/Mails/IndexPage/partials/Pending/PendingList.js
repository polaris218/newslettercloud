import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import MailsTableLayout from 'components/Pages/Mails/IndexPage/partials/MailsTableLayout'


export default function PendingList({ withoutTitle, showOnly, showMorePath, ...props }) {
  if(showOnly && !get(props.pendingList.data, 'length')) return null
  return (
    <MailsTableLayout
      title="title.pendingMails"
      heading={<FormattedMessage id="title.pendingMails" />}
      withoutTitle={withoutTitle}
    >
      <Table
        list={{ results: props.pendingList.data }}
        isLoading={props.pendingList.isLoading}
        paginationLimit={props.pendingList.filters.paginate_by}
        paginationCount={props.pendingList.count}
        paginationOnChange={data => props.pendingList.filter({page:data.currentIndex})}
        showOnly={showOnly}
        showMorePath={showMorePath}
        itemsType={<FormattedMessage id="pending.table.items" />}
      >
        <Column
          field="subject"
          title={<FormattedMessage id="pending.table.subject" />}
          format={(value, item) =>
            <ModalTrigger component={PreviewModal} id={item.mail}>
              <button className="btn btn-link text-left">{value}</button>
            </ModalTrigger>
          }
        />
        <Column
          field="lists"
          title={<FormattedMessage id="pending.table.list" />}
          format={(value) =>
            value.map((i, index) => <span>{i.name} {index < value.length - 1 && ','}</span>)
          }
        />
        <Column
          title={<FormattedMessage id="pending.table.actions" />}
          width="25%"
          format={(_, item) =>
            <div className="d-flex">
              <TooltipContent tooltipText={<FormattedMessage id="common.preview" />} iconType>
                <ModalTrigger component={PreviewModal} id={item.id}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="mails.pending.delete" />}>
                <ModalConfirmationTrigger
                  title={<FormattedMessage id="common.areYouSure" />}
                  message={<FormattedMessage id="mail.delete.areYouSure" values={{ subject: item.subject }} />}
                  onConfirm={() => props.removePending(item)}
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
