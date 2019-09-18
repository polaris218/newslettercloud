import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column, TooltipContent, PageTitle } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import { defaultPagination } from 'common/utils/constants'
import MailsTableLayout from 'components/Pages/Mails/IndexPage/partials/MailsTableLayout'


export default function StoppedList({ withoutTitle, showOnly, showMorePath, ...props }) {
  if(showOnly && !get(props.stoppedList.data, 'length')) return null
  return (
    <MailsTableLayout
      title="title.stoppedMails"
      heading={<FormattedMessage id="title.stoppedMails" />}
      withoutTitle={withoutTitle}
    >
      <Table
        list={{ results: props.stoppedList.data }}
        isLoading={props.stoppedList.isLoading}
        paginationLimit={props.stoppedList.filters.paginate_by}
        paginationCount={props.stoppedList.count}
        paginationOnChange={data => props.stoppedList.filter({page:data.currentIndex})}
        showOnly={showOnly}
        showMorePath={showMorePath}
        itemsType={<FormattedMessage id="stopped.table.items" />}
      >
        <Column
          field="subject"
          title={<FormattedMessage id="stopped.table.subject" />}
          format={(value, item) =>
            <ModalTrigger component={PreviewModal} id={item.mail}>
              <button className="btn btn-link text-left">{value}</button>
            </ModalTrigger>
          }
        />
        <Column
          field="status"
          title={<FormattedMessage id="stopped.table.status" />}
          format={(value) =>
            <span><FormattedMessage id="stopped.table.notEnough" />&nbsp; <Link to="/upgrade"><FormattedMessage id="home.upgrade" /></Link></span>
          }
        />
        <Column
          field="lists"
          title={<FormattedMessage id="stopped.table.list" />}
          format={(value) =>
            value.map((i, index) => <span key={i.name}>{i.name} {index < value.length - 1 && ','}</span>)
          }
        />
        <Column
          title={<FormattedMessage id="stopped.table.actions" />}
          width="25%"
          format={(_, item) =>
            <div className="d-flex">
              <TooltipContent tooltipText={<FormattedMessage id="reports.previewMail" />} iconType>
                <ModalTrigger component={PreviewModal} id={item.mail}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="stopped.table.setAsDraft" />} iconType>
                <FontAwesomeIcon className="fa-md text-danger pointer" icon="stop" onClick={() => props.setDraft(item)} />
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="stopped.table.sendNow" />}>
                <FontAwesomeIcon className="fa-md text-primary pointer" icon="paper-plane" onClick={() => props.sendNow(item.id)} />
              </TooltipContent>
            </div>
          }
        />
      </Table>
    </MailsTableLayout>
  )
}
