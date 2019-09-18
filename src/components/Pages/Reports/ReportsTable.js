import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Table, Column, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import EmptyList from 'components/EmptyList'
import RemoveReportModal from './RemoveReportModal'


function PlaceholderComponent({ lists }) {
  return (
    <EmptyList
      placeholderTitle={<FormattedMessage id="reports.placeholder.title" />}
      placeholderDescription={<FormattedMessage id="reports.placeholder.description" />}
    >
      <div className="text-center" >
        <Link to="/mails/drafts/new" className="btn btn-success">
          <FormattedMessage id="mails.drafts.add" />
        </Link>
      </div>
    </EmptyList>
  )
}

export default function DraftList(props) {
  return (
    <div className="row">
      <div className="col">
        <Table
          list={{ results: props.reports.data }}
          isLoading={props.reports.isLoading}
          paginationLimit={props.reports.filters.paginate_by}
          paginationCount={props.reports.count}
          paginationOnChange={data => props.reports.filter({page:data.currentIndex})}
          placeholderComponent={<PlaceholderComponent />}
          itemsType={<FormattedMessage id="reports.table.items" />}
        >
          <Column
            field="mail_subject"
            title={<FormattedMessage id="reports.table.report" />}
            format={(value, item) =>
              <Link to={`/reports/${item.id}`}>{value}</Link>
            }
          />
          <Column
            field="sent"
            title={<FormattedMessage id="reports.table.sent" />}
            width="20%"
            format={(value) => <span>{getDefaultTypeDateAndTime(value)}</span>}
          />
          <Column
            field="sent_to_lists"
            title={<FormattedMessage id="reports.table.lists" />}
            format={(value) => <span>{value.map((i, ind) => i.name + (ind+1 < value.length ? ', ' : ''))}</span>}
          />
          <Column
            field="sent_to"
            title={<FormattedMessage id="reports.table.sentTo" />}
          />
          <Column
            field="sent_to"
            title={<FormattedMessage id="reports.table.opened" />}
            format={(_, item) => `${item.delivered ? ((item.unique_html_opened / item.delivered) * 100).toFixed(1) : 0}%`}
          />
          <Column
            title={<FormattedMessage id="reports.table.actions" />}
            width="20%"
            format={(_, item) =>
              <div className="d-flex">
                <TooltipContent tooltipText={<FormattedMessage id="reports.view" />} iconType>
                  <Link to={`/reports/${item.id}`}>
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="signal" />
                  </Link>
                </TooltipContent>
                <TooltipContent tooltipText={<FormattedMessage id="reports.previewMail" />} iconType>
                  <ModalTrigger component={PreviewModal} id={item.mail_id}>
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                  </ModalTrigger>
                </TooltipContent>
                <TooltipContent tooltipText={<FormattedMessage id="reports.copyMail" />} iconType>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="copy" onClick={() => props.copyDraft(item.mail_id)} />
                </TooltipContent>
                <TooltipContent tooltipText={<FormattedMessage id="reports.deleteReport" />} iconType>
                  <ModalTrigger
                    component={RemoveReportModal}
                    id={item.id}
                    name={item.mail_subject}
                    onHide={() => props.reports.filter(props.type)}
                  >
                    <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                  </ModalTrigger>
                </TooltipContent>
              </div>
            }
          />
        </Table>
      </div>
    </div>
  )
}
