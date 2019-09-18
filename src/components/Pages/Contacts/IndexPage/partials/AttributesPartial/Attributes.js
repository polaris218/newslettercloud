import React from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Table, Column } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalTrigger from 'modals/ModalTrigger'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import ModalAddAttribute from './ModalAddAttribute'
import EmptyList from 'components/EmptyList'
import { PageTitle, TooltipContent } from 'common/widgets'


function PlaceholderComponent({ filter, filters }) {
  return (
    <EmptyList
      placeholderTitle={<FormattedMessage id="attributes.placeholder.title" />}
      placeholderDescription={<FormattedMessage id="attributes.placeholder.description" />}
    >
      <div className="text-center" >
        <ModalTrigger
          component={ModalAddAttribute}
          onHide={() => filter(filters)}
        >
          <button className="btn btn-success"><FormattedMessage id="attributes.addAttributeBtn" /></button>
        </ModalTrigger>
      </div>
    </EmptyList>
  )
}


export default function Attributes({ attributes }) {
  const { data: list, isLoading, count, filter, filters } = attributes
  return (
    <div>
      <PageTitle title="title.attributes"/>
      <div className="text-right pb-4">
        <ModalTrigger
          component={ModalAddAttribute}
          onHide={() => filter(filters)}
        >
          <button className="btn btn-success"><FormattedMessage id="attributes.addAttributeBtn" /></button>
        </ModalTrigger>
      </div>
      <Table
        list={{ results: list }}
        isLoading={isLoading}
        paginationLimit={attributes.filters.paginate_by}
        paginationCount={count}
        paginationOnChange={data => filter({page:data.currentIndex})}
        placeholderComponent={<PlaceholderComponent filter={filter} filters={filters} />}
        itemsType={<FormattedMessage id="common.attributes" />}
      >
        <Column
          field="name"
          title={<FormattedMessage id="attributes.table.name" />}
          mockData="Name"
          format={(name, item) => {
            return (
              <ModalTrigger
              component={ModalAddAttribute}
              code={item.code}
              onHide={() => filter(filters)}
            >
              <button className="btn btn-link">{name}</button>
            </ModalTrigger>
            )
          }}
        />
        <Column
          field="usage_count"
          title={<FormattedMessage id="attributes.table.usage" />}
          width="34%"
          format={(value) => <FormattedMessage id="attributes.usage" values={{ count: value }} />}
        />
        <Column
          field="code"
          title={<FormattedMessage id="attributes.table.code" />}
          format={(code) => <span>[[{code}]]</span>}
        />
        <Column
          field="name"
          length="120"
          title={<FormattedMessage id="common.inputs.actions" />}
          width="100px"
          format={(value, item) =>
            <>
              <TooltipContent tooltipText={<FormattedMessage id="actions.attribute.edit" />} iconType>
                <ModalTrigger
                  component={ModalAddAttribute}
                  onHide={attributes.fetch}
                  code={item.code}
                  modalHeader={<FormattedMessage id="common.editList" />}
                >
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                </ModalTrigger>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="actions.attribute.remove" />}>
                <ModalConfirmationTrigger
                  message={<FormattedMessage id="attributes.modal.delete" values={{ value }} />}
                  title={<FormattedMessage id="common.areYouSure" />}
                  onConfirm={() => attributes.remove(item)
                    .then(_ => toast.success(<FormattedMessage id="toasters.attribute.deleted" />))}
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
