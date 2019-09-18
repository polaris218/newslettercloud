import React from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

import { Table, Column } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import EmptyList from 'components/EmptyList'
import { PageTitle, TooltipContent } from 'common/widgets'


function PlaceholderComponent({ filter, filters }) {
  return (
    <EmptyList
      placeholderTitle={<FormattedMessage id="contacts.api.placeholder.title" />}
      placeholderDescription={<FormattedMessage id="contacts.api.placeholder.description" />}
    >
      <div className="text-center" >
        <Link to="/forms/regular/add" className="btn btn-success">
          <FormattedMessage id="contacts.api.addForm" />
        </Link>
      </div>
    </EmptyList>
  )
}


export default function Forms({ forms }) {
  const { data: list, isLoading, count, filter, filters } = forms
  return (
    <div>
      <PageTitle title="title.forms"/>
      <div className="text-right pb-4">
        <Link to="/forms/regular/add" className="btn btn-success">
          <FormattedMessage id="contacts.api.addForm" />
        </Link>
      </div>
      <Table
        list={{ results: list }}
        isLoading={isLoading}
        paginationLimit={forms.filters.paginate_by}
        paginationCount={count}
        paginationOnChange={data => filter({page:data.currentIndex})}
        placeholderComponent={<PlaceholderComponent filter={filter} filters={filters} />}
        itemsType={<FormattedMessage id="forms.table.forms" />}
      >
        <Column
          field="name"
          title={<FormattedMessage id="forms.table.name" />}
          format={(name, item) => {
            return <Link to={`/forms/regular/edit/${item.key}`}>{name}</Link>
          }}
        />
        <Column
          field="lists_names"
          title={<FormattedMessage id="forms.table.list" />}
        />
        <Column
          field="name"
          length="120"
          title={<FormattedMessage id="common.inputs.actions" />}
          width="100px"
          format={(value, item) =>
            <>
              <TooltipContent tooltipText={<FormattedMessage id="actions.form.edit" />} iconType>
                <Link to={`/forms/regular/edit/${item.key}`} className="no-link">
                  <FontAwesomeIcon className="fa-md text-primary pointer" icon="edit" />
                </Link>
              </TooltipContent>
              <TooltipContent tooltipText={<FormattedMessage id="actions.form.remove" />}>
                <ModalConfirmationTrigger
                  message={<FormattedMessage id="contacts.api.delete" values={{ name: value }} />}
                  title={<FormattedMessage id="common.areYouSure" />}
                  onConfirm={() => forms.remove(item)
                    .then(_ => toast.success(<FormattedMessage id="toasters.form.deleted" />))}
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
