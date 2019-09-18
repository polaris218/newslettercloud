import React from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { Table, Column, Dropdown, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import ReplanAutoresponderModal from 'modals/components/ReplanAutoresponderModal'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import { formatSendAfter } from 'common/utils/helpers'
import { defaultPagination } from 'common/utils/constants'
import MailsTableLayout from 'components/Pages/Mails/IndexPage/partials/MailsTableLayout'


export default function AutorespondersList({ withoutTitle, showOnly, showMorePath, ...props }) {
  if(showOnly && !get(props.autorespondersList.data, 'length')) return null
  return (
    <MailsTableLayout
      heading={<FormattedMessage id="common.inputs.autoresponders" />}
      title="title.autoresponders"
      withoutTitle={withoutTitle}
    >
      <Table
        list={{ results: props.autorespondersList.data }}
        isLoading={props.autorespondersList.isLoading}
        paginationLimit={props.autorespondersList.filters.paginate_by}
        paginationCount={props.autorespondersList.count}
        paginationOnChange={data => props.autorespondersList.filter({page:data.currentIndex})}
        showOnly={showOnly}
        showMorePath={showMorePath}
        itemsType={<FormattedMessage id="autoresponder.table.title" />}
      >
        <Column
          field="mail.subject"
          title={<FormattedMessage id="autoresponder.table.subject" />}
          format={(value, item) =>
            <ModalTrigger component={PreviewModal} id={get(item, 'mail.id')}>
              <button className="btn btn-link text-left">{value}</button>
            </ModalTrigger>
          }
        />
        <Column
          field="on_hold"
          title={<FormattedMessage id="autoresponder.table.status" />}
          format={(value) =>
            <span>{value ? <FormattedMessage id="autoresponder.table.pausedSince" values={{ time: getDefaultTypeDateAndTime(value) }} /> : <FormattedMessage id="autoresponder.table.running" />}</span>
          }
        />
        <Column
          field="time_to_send"
          title={<FormattedMessage id="autoresponder.table.sentAfter" />}
          format={(value) =>
            <span>{formatSendAfter(value)}</span>
          }
        />
        <Column
          field="list"
          title={<FormattedMessage id="autoresponder.table.list" />}
          format={(value) =>
            <span>{get(value, 'name')}</span>
          }
        />
        <Column
          title={<FormattedMessage id="autoresponder.table.actions" />}
          width="25%"
          format={(_, item) =>
            <div className="d-flex">
              <TooltipContent tooltipText={<FormattedMessage id="reports.view" />} iconType>
                <Link to={`/reports/${item.report}`}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="signal" />
                </Link>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="autoresponder.table.preview" />} iconType>
                <ModalTrigger component={PreviewModal} id={get(item, 'mail.id')}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="autoresponder.table.new" />} iconType>
                <FontAwesomeIcon className="fa-md text-primary pointer" icon="copy" onClick={() => props.copyDraft(item)} />
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="autoresponder.table.delete" />} iconType>
                <ModalConfirmationTrigger
                  title={<FormattedMessage id="common.areYouSure" />}
                  message={<FormattedMessage id="autoresponder.table.deleteModal" values={{ name: get(item.mail, 'subject') }} />}
                  onConfirm={() => props.removeResponder(item)}
                  checkboxAction={() => props.removeReport(item.report)}
                  checkboxActionText={<FormattedMessage id="autoresponder.table.deleteReport" />}
                >
                  <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                </ModalConfirmationTrigger>
              </TooltipContent>
                {
                  !item.on_hold ?
                  <TooltipContent tooltipText={<FormattedMessage id="autoresponder.table.pause" />} iconType>
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="pause" />
                  </TooltipContent> :
                  <>
                    <TooltipContent tooltipText={<FormattedMessage id="autoresponder.table.resume" />} iconType>
                      <FontAwesomeIcon className="fa-md text-primary pointer" icon="play" />
                    </TooltipContent>
                    <TooltipContent tooltipText={<FormattedMessage id="autoresponder.table.edit" />} iconType>
                      <Link to="/mails/autoresponders">
                        <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                      </Link>
                    </TooltipContent>
                    <TooltipContent tooltipText={<FormattedMessage id="autoresponder.table.replan" />}>
                      <ModalTrigger component={ReplanAutoresponderModal} id={item.id} onHide={props.autorespondersList.fetch}>
                        <FontAwesomeIcon className="fa-md text-primary pointer" icon="clock" />
                      </ModalTrigger>
                    </TooltipContent>
                  </>
                }
            </div>
          }
        />
      </Table>
    </MailsTableLayout>
  )
}
