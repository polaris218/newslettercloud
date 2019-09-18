import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column, Dropdown, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import { getDomain } from 'common/utils/helpers'
import EmptyList from 'components/EmptyList'
import MailsTableLayout from 'components/Pages/Mails/IndexPage/partials/MailsTableLayout'
import { PageTitle } from 'common/widgets'

function PlaceholderComponent({ lists }) {
  return (
    <EmptyList
      placeholderTitle={<FormattedMessage id="mails.drafts.placeholder.title" />}
      placeholderDescription={<FormattedMessage id="mails.drafts.placeholder.description" />}
    >
      <div className="text-center" >
        <Link to="/mails/drafts/new" className="btn btn-success">
          <FormattedMessage id="mails.drafts.add" />
        </Link>
      </div>
    </EmptyList>
  )
}

export default function DraftList({ isDraft = true, withoutTitle, showOnly, showMorePath, ...props }) {
  return (
    <div>
      <PageTitle title="title.mails"/>
      <MailsTableLayout
        title="title.drafts"
        heading={<FormattedMessage id="mails.drafts.title" />}
        isDraft={isDraft}
        withoutTitle={withoutTitle}
        showHeading={showOnly && !get(props.drafts.data, 'length') ? false : true}
      >
        <Table
          list={{ results: props.drafts.data }}
          isLoading={props.drafts.isLoading || props.cloneDraft.isLoading}
          paginationLimit={props.drafts.filters.paginate_by}
          paginationCount={props.drafts.count}
          paginationOnChange={data => props.drafts.filter({page:data.currentIndex})}
          placeholderComponent={<PlaceholderComponent/>}
          showOnly={showOnly}
          showMorePath={showMorePath}
          itemsType={<FormattedMessage id="drafts.table.items" />}
        >
          <Column
            field="name"
            title={<FormattedMessage id="drafts.table.subject" />}
            format={(_, item) =>
              item.type ?
                <a href={`http://${getDomain()}/blockeditor/mail/${item.id}/?isBeta`} className="btn btn-link">
                  {item.subject}
                </a> :
                <Link to={`/mails/advanced/detail/${item.id}`} className="btn btn-link">
                  {item.subject}
                </Link>
            }
          />
          <Column
            field="description"
            className="break-word"
            title={<FormattedMessage id="drafts.table.updated" />}
            format={(_, item) => <span>{getDefaultTypeDateAndTime(item.created)}</span>}
          />
          <Column
            title={<FormattedMessage id="drafts.table.actions" />}
            width="25%"
            format={(_, item) =>
              <div className="d-flex">
                <TooltipContent tooltipText={<FormattedMessage id="mails.drafts.edit" />} iconType>
                  {
                    item.type ?
                      <a href={`http://${getDomain()}/blockeditor/mail/${item.id}/?isBeta`}>
                        <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                      </a> :
                      <Link to={`/mails/advanced/detail/${item.id}`}>
                        <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                      </Link>
                  }
                </TooltipContent>
                <TooltipContent tooltipText={<FormattedMessage id="mails.drafts.preview" />} iconType>
                  <ModalTrigger component={PreviewModal} previewUrl={item.preview_url}>
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                  </ModalTrigger>
                </TooltipContent>
                <TooltipContent tooltipText={<FormattedMessage id="mails.drafts.copy" />} iconType>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="copy" onClick={() => props.copyDraft(item)} />
                </TooltipContent>
                <TooltipContent tooltipText={<FormattedMessage id="mails.drafts.delete" />} iconType>
                  <ModalConfirmationTrigger
                    title={<FormattedMessage id="common.areYouSure" />}
                    message={<FormattedMessage id="mails.drafts.going" values={{ draft: item.subject }} />}
                    onConfirm={() => props.removeDraft(item)}
                  >
                    <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                  </ModalConfirmationTrigger>
                </TooltipContent>
                <TooltipContent tooltipText={<FormattedMessage id="mails.drafts.prepare" />}>
                  <Link to={`/mails/drafts/send/${item.id}`}>
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="paper-plane" />
                  </Link>
                </TooltipContent>
              </div>
            }
          />
        </Table>
      </MailsTableLayout>
    </div>
  )
}
