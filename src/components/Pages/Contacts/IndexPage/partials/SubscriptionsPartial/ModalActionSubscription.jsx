import React from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'

import { Modal, ModalBody, ModalFooter } from 'components/Modal'
import ButtonSpinner from 'components/ButtonSpinner'
import { connectResource } from 'common/utils/resource'
import API from 'api'


export default function ModalActionSubscription({ subscriptions, body = {}, action, actiontToast, ...props }) {

  return (
    <Modal onClose={props.onClose} className="confirmation-modal">
      <form onSubmit={props.onSubmit}>
        <ModalBody>
          <p className="lead">
            <FormattedMessage id={`subscription.${action}.areYouSure`} values={{ count: props.count }} />
          </p>
        </ModalBody>
        <ModalFooter className="flex-column align-items-stretch">
          <ButtonSpinner
            type="button"
            className={`btn ${props.dangerAction ? "btn-danger" : "btn-success"} mr-0 mb-3`}
            spin={props.isLoading}
            disabled={props.isLoading}
            onClick={(ev) => {
              ev.preventDefault()
              return API(`subscriptions/${action}`).post(body,{ id:subscriptions.join(',') })
                .then(_ => toast.success(<FormattedMessage id={`toasters.contact.${actiontToast}`} />))
                .then(_ => {
                  props.onClose()
                  props.callBack()
                })
            }}
          >
            {props.confirmBtn || <FormattedMessage id="common.cancelSubscription" />}
          </ButtonSpinner>
          <button type="button" className="btn btn-outline-secondary ml-0" onClick={props.onClose}>
            {props.cancelBtn || <FormattedMessage id="common.cancel" />}
          </button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
