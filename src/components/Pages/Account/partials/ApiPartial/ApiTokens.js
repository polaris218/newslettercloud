import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Table, Column, TooltipContent } from 'common/widgets'
import ModalTrigger from 'modals/ModalTrigger'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import AddApiTokenContainer from './AddApiTokenContainer'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { defaultPagination } from 'common/utils/constants'
import EmptyList from 'components/EmptyList'


function PlaceholderComponent(props) {
  return (
    <EmptyList
      placeholderTitle={<FormattedMessage id="apiTokens.placeholder.title" />}
      placeholderDescription={<FormattedMessage id="apiTokens.placeholder.description" />}
    />
  )
}

export default function ApiTokens(props) {
  return (
    <div className="col-9">
      <div className="row align-items-center mb-4">
        <div className="col-8">
          <h2><FormattedMessage id="apiTokens.title" /></h2>
          <p className="mb-0"><FormattedMessage id="apiTokens.description" /></p>
        </div>
        <div className="col-4 text-right">
          <ModalTrigger
            component={AddApiTokenContainer}
            onHide={props.tokens.fetch}
          >
            <button className="btn btn-success">
              <FormattedMessage id="apiTokens.addToken" />
            </button>
          </ModalTrigger>
        </div>
      </div>
      <Table
        list={{ results: props.tokens.data }}
        isLoading={props.tokens.isLoading}
        paginationLimit={props.tokens.filters.paginate_by}
        paginationCount={props.tokens.count}
        paginationOnChange={data => props.tokens.filter({page:data.currentIndex})}
        placeholderComponent={<PlaceholderComponent />}
      >
        <Column
          field="name"
          title={'Name'}
          length="120"
          format={(value, item) =>
            <ModalTrigger
              component={AddApiTokenContainer}
              id={item.id}
              onHide={props.tokens.fetch}
            >
              <button className="btn-link text-left">{value}</button>
            </ModalTrigger>
          }
        />
        <Column
          field="description"
          className="break-word"
          title={'Description'}
          length="120"
        />
        <Column
          title={'Actions'}
          format={(_, item) =>
            <>
              <TooltipContent tooltipText={<FormattedMessage id="actions.token.edit" />} iconType>
                <ModalTrigger
                  component={AddApiTokenContainer}
                  id={item.id}
                  onHide={props.tokens.fetch}
                  modalHeader="Edit API token"
                >
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="actions.token.remove" />}>
                <ModalConfirmationTrigger
                  message={<FormattedMessage id="apiTokens.deleteModal" values={{ token: item.name }} />}
                  title={<FormattedMessage id="common.areYouSure" />}
                  onConfirm={() => props.removeItem(item)}
                >
                  <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                </ModalConfirmationTrigger>
              </TooltipContent>
            </>
          }
        />
      </Table>
    </div>
  )
}
