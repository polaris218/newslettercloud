import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import PageHeader from 'components/PageHeader'
import { Table, Column, TooltipContent } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import { getDomain, checkAccountStatus } from 'common/utils/helpers'
import EmptyList from 'components/EmptyList'
import { PageTitle } from 'common/widgets'


function PlaceholderComponent({ filter, filters }) {
  return (
    <EmptyList
      placeholderTitle={<FormattedMessage id="templates.placeholder.title" />}
      placeholderDescription={<FormattedMessage id="templates.placeholder.description" />}
    >
      <div className="text-center" >
        <Link to="/mails/templates/create" className="btn btn-success">
          <FormattedMessage id="templates.create" />
        </Link>
      </div>
    </EmptyList>
  )
}

export default function Template(props) {
  const isFreeAccount = checkAccountStatus(props.profile)
  return (
    <div>
      <PageTitle title="title.templates"/>

      <div className="row justify-content-between mb-4 align-items-center">
        <div className="col-6">
          <h3 className="mb-0"><FormattedMessage id="templates.blockEditor" /></h3>
        </div>
        <div className="col-6 text-right">
          <Link to="/mails/templates/create" className="btn btn-success">
            <FormattedMessage id="templates.create" />
          </Link>
        </div>
      </div>
      <Table
        list={{ results: props.blockTemplates.data }}
        isLoading={props.blockTemplates.isLoading}
        paginationLimit={5}
        placeholderComponent={<PlaceholderComponent/>}
        paginationCount={props.blockTemplates.count}
        paginationOnChange={data => props.blockTemplates.filter({page:data.currentIndex})}
        routerPage={props.blockTemplates.filters.page}
        itemsType={<FormattedMessage id="templates.table.items" />}
      >
        <Column
          field="subject"
          title={<FormattedMessage id="templates.table.subject" />}
          format={(value, item) =>
            <a href={`http://${getDomain()}/blockeditor/template/${item.id}/?isBeta`} className="btn btn-link">
              {value}
            </a>
          }
        />
        <Column
          field="updated"
          title={<FormattedMessage id="templates.table.updated" />}
          format={(value) => getDefaultTypeDateAndTime(value)}
        />
        <Column
          title={<FormattedMessage id="templates.table.actions" />}
          width="20%"
          format={(_, item) =>
            <div className="d-flex">
              <TooltipContent tooltipText={<FormattedMessage id="templates.table.edit" />} iconType>
                <a href={`http://${getDomain()}/blockeditor/template/${item.id}/?isBeta`}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                </a>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="templates.table.preview" />} iconType>
                <ModalTrigger component={PreviewModal} previewUrl={item.preview_url}>
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="templates.table.copy" />} iconType>
                <FontAwesomeIcon className="fa-md text-primary pointer" icon="copy" onClick={() => props.copyBlockTemplate(item)} />
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="templates.table.delete" />} iconType>
                <ModalConfirmationTrigger
                  title={<FormattedMessage id="common.areYouSure" />}
                  message={<FormattedMessage id="templates.table.deleteMessage" values={{ name: item.subject }} />}
                  onConfirm={() => props.removeBlockTemplate(item)}
                >
                  <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                </ModalConfirmationTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="templates.table.openAsNew" />}>
                <FontAwesomeIcon className="fa-md text-primary pointer" icon="paper-plane" onClick={() => props.openAsNewBlockTemplate(item)} />
              </TooltipContent>
            </div>
          }
        />
      </Table>
      {
        !isFreeAccount && !!get(props.htmlTemplates, 'data.length') &&
        <>
          <h3 className="mb-4"><FormattedMessage id="templates.advancedTemplates" /></h3>
          <Table
            list={{ results: props.htmlTemplates.data }}
            isLoading={props.htmlTemplates.isLoading}
            paginationLimit={5}
            paginationCount={props.htmlTemplates.count}
            placeholderComponent={<PlaceholderComponent />}
            paginationOnChange={data => props.htmlTemplates.filter({page:data.currentIndex})}
            routerPage={props.htmlTemplates.filters.page}
            itemsType={<FormattedMessage id="templates.table.items" />}
          >
            <Column
              field="subject"
              title={<FormattedMessage id="templates.table.subject" />}
              format={(value, item) => <Link to={`/mails/templates/advanced/detail/${item.id}`}>{value}</Link>}
            />
            <Column
              field="updated"
              title={<FormattedMessage id="templates.table.updated" />}
              format={(value) => getDefaultTypeDateAndTime(value)}
            />
            <Column
              title={<FormattedMessage id="templates.table.actions" />}
              width="20%"
              format={(_, item) =>
                <div className="d-flex">
                  <TooltipContent tooltipText={<FormattedMessage id="templates.table.edit" />} iconType>
                    <Link to={`/mails/templates/advanced/detail/${item.id}`}>
                      <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                    </Link>
                  </TooltipContent>
                  <TooltipContent tooltipText={<FormattedMessage id="templates.table.preview" />} iconType>
                    <ModalTrigger component={PreviewModal} previewUrl={item.preview_url}>
                      <FontAwesomeIcon className="fa-md text-primary pointer" icon="eye" />
                    </ModalTrigger>
                  </TooltipContent>
                  <TooltipContent tooltipText={<FormattedMessage id="templates.table.copy" />} iconType>
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="copy" onClick={() => props.copyHtmlTemplate(item)} />
                  </TooltipContent>
                  <TooltipContent tooltipText={<FormattedMessage id="templates.table.delete" />} iconType>
                    <ModalConfirmationTrigger
                      title={<FormattedMessage id="common.areYouSure" />}
                      message={<FormattedMessage id="templates.table.deleteMessage" values={{ name: item.subject }} />}
                      onConfirm={() => props.removeHtmlTemplate(item)}
                    >
                      <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                    </ModalConfirmationTrigger>
                  </TooltipContent>
                  <TooltipContent tooltipText={<FormattedMessage id="templates.table.openAsNew" />}>
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="paper-plane" onClick={() => props.openAsNewHtmlTemplate(item)} />
                  </TooltipContent>
                </div>
              }
            />
          </Table>
        </>
      }
    </div>
  )
}
