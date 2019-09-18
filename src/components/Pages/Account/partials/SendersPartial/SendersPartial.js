import React from 'react';
import { FormattedMessage } from 'react-intl'

import { Table, Column, TooltipContent } from 'common/widgets'
import ModalTrigger from 'modals/ModalTrigger'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import AddSendersContainer from './AddSendersContainer'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import { defaultPagination } from 'common/utils/constants'


export default function SendersPartial(props) {
  return (
    <>
      <div className="row mb-4 align-items-center">
        <div className="col-8">
          <h2><FormattedMessage id="senders.title" /></h2>
          <p className="mb-0">
            <FormattedMessage id="senders.description" />
          </p>
        </div>
        <div className="col-4 text-right">
          <ModalTrigger
            component={AddSendersContainer}
            onHide={props.senders.fetch}
          >
            <button className="btn btn-success">
              <FormattedMessage id="senders.addSender" />
            </button>
          </ModalTrigger>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <Table
            list={{ results: props.senders.data }}
            isLoading={props.senders.isLoading}
            paginationLimit={props.senders.filters.paginate_by}
            paginationCount={props.senders.count}
            paginationOnChange={data => props.senders.filter({page:data.currentIndex})}
            itemsType={<FormattedMessage id="senders.table.items" />}
          >
            <Column
              field="name"
              title={<FormattedMessage id="senders.table.name" />}
              length="120"
            />
            <Column
              field="email"
              length="120"
              title={<FormattedMessage id="senders.table.email" />}
            />
            <Column
              field="created"
              title={<FormattedMessage id="senders.table.created" />}
              format={(_, item) =>
                <span>{getDefaultTypeDateAndTime(item.created)}</span>
              }
            />
            <Column
              title={<FormattedMessage id="senders.table.actions" />}
              format={(_, item) =>
                <>
                  <TooltipContent tooltipText={<FormattedMessage id="actions.sender.edit" />} iconType>
                    <ModalTrigger
                      component={AddSendersContainer}
                      id={item.id}
                      onHide={props.senders.fetch}
                      modalHeader={<FormattedMessage id="senders.editSender" />}
                    >
                      <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                    </ModalTrigger>
                  </TooltipContent>
                  <TooltipContent tooltipText={<FormattedMessage id="actions.sender.remove" />}>
                    <ModalConfirmationTrigger
                      message={<FormattedMessage id="senders.deleteModal" values={{ name: item.name }} />}
                      title={<FormattedMessage id="common.areYouSure" />}
                      onConfirm={() => props.removeSender(item)}
                    >
                      <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                    </ModalConfirmationTrigger>
                  </TooltipContent>
                </>
              }
            />
          </Table>
        </div>
      </div>
    </>
  );
}
