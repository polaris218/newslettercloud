import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Table, Column } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { PageTitle } from 'common/widgets'
import ModalTrigger from 'modals/ModalTrigger'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'

export default function PendingPreview({ pendingReview, removeDraft }) {
  return (
    <div className="container">
      <div className="row">
        <PageTitle title="title.drafts"/>
        <div className="col">
          <div className="row align-items-center mb-4">
            <div className="col-6">
              <h1 className="mb-0"><FormattedMessage id="mails.drafts.pendingReview.title" /></h1>
            </div>
            <div className="col-6 text-right">
              <Link to="/mails/drafts" className="btn btn-light">
                <FormattedMessage id="mails.drafts.pendingReview.back" />
              </Link>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-8">
              <p>
              <FormattedMessage id="mails.drafts.pendingReview.description" />
              </p>
            </div>
          </div>
          <Table
            list={{ results: pendingReview.data }}
            isLoading={pendingReview.isLoading}
            paginationLimit={pendingReview.filters.paginate_by}
            paginationCount={pendingReview.count}
            paginationOnChange={data => pendingReview.filter({page:data.currentIndex})}
            itemsType={<FormattedMessage id="common.mail" />}
          >
            <Column
              field="subject"
              title={'Subject'}
              width="46%"
            />
            <Column
              field="lists"
              title={'List'}
              width="46%"
              format={(listArr) => {
                return <>
                  {listArr.map((list, ind) => `${list.name}${ind + 1 < listArr.length ? ', ' :''}`)}
                </>
              }}
            />
            <Column
              field="name"
              title={'Actions'}
              format={(_, item) => (
                  <ModalConfirmationTrigger
                      title={<FormattedMessage id="common.areYouSure" />}
                      message={<FormattedMessage id="mails.drafts.going" values={{ draft: item.subject }} />}
                      onConfirm={() => removeDraft(item)}
                    >
                      <div className="dropdown-item divider">
                        <FontAwesomeIcon className="fa-md mr-2 text-primary pointer" icon="trash-alt" />
                      </div>
                    </ModalConfirmationTrigger>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  )
}
