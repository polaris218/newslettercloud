import React from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Table, Column } from 'common/widgets'
import ModalTrigger from 'modals/ModalTrigger'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import AddListModal from 'modals/components/AddListModal'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { defaultPagination } from 'common/utils/constants'
import EmptyList from 'components/EmptyList'
import { PageTitle, TooltipContent } from 'common/widgets'


function PlaceholderComponent({ lists }) {
  return (
    <EmptyList
      placeholderTitle={<FormattedMessage id="contacts.lists.placeholder.title" />}
      placeholderDescription={<FormattedMessage id="contacts.lists.placeholder.description" />}
    >
      <div className="text-center" >
        <ModalTrigger
          component={AddListModal}
          onHide={lists.fetch}
        >
          <button className="btn btn-success ml-auto"><FormattedMessage id="lists.addListBtn" /></button>
        </ModalTrigger>
      </div>
    </EmptyList>
  )
}

export default function ListsPartial({ lists, history }) {
  const showModal = get(history, 'location.state.showModal')
  const editModal = get(history, 'location.state.editModal')
  const id = get(history, 'location.state.id')
  return (
    <>
    <PageTitle title="title.lists"/>
      <div className="text-right pb-4">
        {showModal && <AddListModal onClose={() => {
          lists.fetch()
          history.push('/lists')
        }} id={id} />}
        {editModal && <AddListModal
          onClose={() => {
            lists.fetch()
            history.push('/lists')
          }}
          id={id}
          modalHeader={<FormattedMessage id="common.editList" />}
        />}
        <ModalTrigger
          component={AddListModal}
          onHide={lists.fetch}
        >
          <button className="btn btn-success ml-auto"><FormattedMessage id="lists.addListBtn" /></button>
        </ModalTrigger>
      </div>
      <Table
        list={{
          results: lists.data,
          filters: {
            data: lists.filters,
            orderBy: (name) => lists.filter({ ordering: name }),
          }
        }}
        isLoading={lists.isLoading}
        paginationLimit={lists.filters.paginate_by}
        paginationCount={lists.count}
        paginationOnChange={data => lists.filter({page:data.currentIndex})}
        placeholderComponent={<PlaceholderComponent lists={lists} />}
        itemsType={<FormattedMessage id="lists.table.items" />}
      >
        <Column
          field="name"
          title={<FormattedMessage id="common.inputs.name" />}
          length="120"
          orderable="desc"
          format={(value, item) =>
            <ModalTrigger
              component={AddListModal}
              onHide={lists.fetch}
              id={item.hash}
              modalHeader={<FormattedMessage id="common.editList" />}
            >
              <button className="btn btn-link break-word">{value}</button>
            </ModalTrigger>
          }
        />
        <Column
          field="description"
          title={<FormattedMessage id="common.inputs.description" />}
          length="100"
        />
        <Column
          field="active_subscribers_count"
          title={<FormattedMessage id="common.inputs.subscribers" />}
          format={(value, item) =>{
            if(value) {
              return <Link to={{
                pathname: '/subscriptions',
                state: { lists: item.hash },
              }}><FormattedMessage id="contacts.lists.activeSubscribers" values={{ value }} /></Link>
            }
            return <FormattedMessage id="contacts.lists.activeSubscribers" values={{ value }} />
          }}
        />
        <Column
          field="responders_count"
          title={<FormattedMessage id="common.inputs.autoresponders" />}
          format={(value) =>
            <span>
              {
                value ? (
                  <span><FormattedMessage id="contacts.lists.autorespondersRunning" values={{ value }} /></span>
                ) : (
                  <span><FormattedMessage id="contacts.lists.autorespondersNotRunning" /></span>
                )
              }
            </span>
          }
        />
        <Column
          field="name"
          length="120"
          title={<FormattedMessage id="common.inputs.actions" />}
          width="100px"
          format={(value, item) =>
            <>
              <TooltipContent tooltipText={<FormattedMessage id="actions.list.edit" />} iconType>
                <ModalTrigger
                  component={AddListModal}
                  onHide={lists.fetch}
                  id={item.hash}
                  modalHeader={<FormattedMessage id="common.editList" />}
                >
                    <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="actions.list.remove" />}>
                <ModalConfirmationTrigger
                  message={<FormattedMessage id="contacts.lists.delete" values={{ value }} />}
                  title={<FormattedMessage id="common.areYouSure" />}
                  onConfirm={() => lists.remove(item)
                    .then(_ => toast.success(<FormattedMessage id="toasters.list.removed" />))}
                >
                    <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                </ModalConfirmationTrigger>
              </TooltipContent>
              </>
          }
        />
      </Table>
    </>
  )
}
