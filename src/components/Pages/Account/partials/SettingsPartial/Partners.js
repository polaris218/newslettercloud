import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Table, Column, TooltipContent } from 'common/widgets'
import ModalTrigger from 'modals/ModalTrigger'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'
import AddPartnerModal from 'modals/components/AddPartnerModal'
import { FontAwesomeIcon } from 'lib/font-awesome'


export default function ListsPartial({ partners, removePartner }) {
  return (
    <>
      <div className="row align-items-center mb-4">
        <div className="col">
          <h2 className="mb-0">Partners</h2>
        </div>
        <div className="col">
          <div className="text-right">
            <ModalTrigger
              onHide={partners.fetch}
              component={AddPartnerModal}
            >
              <button className="btn btn-success ml-auto"><FormattedMessage id="settings.addPartner" /></button>
            </ModalTrigger>
          </div>
        </div>
      </div>
      <Table list={{ results: partners.data }} isLoading={partners.isLoading}>
        <Column
          field="name"
          title="Name"
          format={(_, item) =>
            <span>
              {
                !item.first_name && !item.last_name ?
                '-' :
                `${item.first_name} ${item.last_name}`.trim()
              }
            </span>
          }
        />
        <Column
          field="email"
          title="Email"
          length="100"
        />
        <Column
          field="name"
          length="120"
          title="Actions"
          width="100px"
          format={(_, item) => {
            let name = ''
            if(!item.first_name && !item.last_name) {
              name = '-'
            } else {
              name = `${item.first_name} ${item.last_name}`.trim()
            }
            return (
              <TooltipContent tooltipText={<FormattedMessage id="actions.partner.remove" />}>
                <ModalConfirmationTrigger
                  message={<FormattedMessage id="settings.deleteModal" values={{ name: name }} />}
                  title={<FormattedMessage id="common.areYouSure" />}
                  onConfirm={() => removePartner(item)}
                >
                  <FontAwesomeIcon className="fa-md text-danger pointer" icon="trash-alt" />
                </ModalConfirmationTrigger>
              </TooltipContent>
            )
            }
          }
        />
      </Table>
    </>
  )
}
