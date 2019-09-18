import React from 'react'
import { FormattedMessage } from 'react-intl'
import findIndex from 'lodash/findIndex'
import { toast } from 'react-toastify'
import get from 'lodash/get'

import { required, validateEmail } from 'validations'
import { TextField, SelectField } from 'common/forms'
import ButtonSpinner from 'components/ButtonSpinner'
import { AttributesForm } from 'common/widgets'
import { FontAwesomeIcon } from 'lib/font-awesome'
import { getDefault24TypeDateAndTime } from 'common/utils/formatDate'
import ModalTrigger from 'modals/ModalTrigger'
import ModalSubscription from './ModalSubscription'
import { generateListOptionsObject } from 'common/utils/helpers'
import ModalConfirmationTrigger from 'modals/ModalConfirmationTrigger'


export default function ContactPage({ contact, handleSubmit, lists, change, formLists, confirmDelete, onCreateList,
  isAddSubscription, isAddSubscriptionTrigger, updateSubscriptions,
  onSubmit, reactivateContact, ...restProps }) {

  const { data:user, isLoading } = contact
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row mb-4">
        <div className="col-12">
          <h1><FormattedMessage id="contact.editContact" /></h1>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <TextField
                      name="email"
                      className="form-control-lg"
                      label={<FormattedMessage id="common.inputs.emailAddress" />}
                      validate={[ required, validateEmail ]}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <TextField
                      type="text"
                      name="first_name"
                      className="form-control-lg"
                      id="first_name"
                      label={<FormattedMessage id="common.inputs.firstName" />}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <TextField
                      type="text"
                      name="last_name"
                      className="form-control-lg"
                      label={<FormattedMessage id="common.inputs.lastName" />}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <AttributesForm addAttributeModal={true}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title mb-0"><FormattedMessage id="common.titles.subscriptions" /></h4>
            </div>
            <ul className="list-group list-group-flush small">
              {
                !!get(user, 'lists.length') && user.lists.map(list =>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">
                        <span className="d-block small text-muted mb-1"><FormattedMessage id="common.list" /></span>
                        <span>{list.name}</span>
                      </div>
                      <div className="col">
                        <span className="d-block small text-muted mb-1">Status</span>
                        {
                          list.subscription_cancelled ?
                          <div>
                            <FontAwesomeIcon
                              icon={'times'}
                              className={'text-danger mr-2'}
                            />
                            <FormattedMessage id="contact.cancelledOn" />: {getDefault24TypeDateAndTime(list.subscription_cancelled)}
                          </div> :
                          <div>
                            <FontAwesomeIcon
                              icon={'check'}
                              className={'text-success mr-2'}
                            />
                            <FormattedMessage id="contact.activeSince" />: {getDefault24TypeDateAndTime(list.subscription_created)}
                          </div>
                        }
                      </div>
                      <div className="col-4">
                        <span className="d-block small text-muted mb-1"><FormattedMessage id="common.actions" /></span>
                        {
                          list.subscription_cancelled ?
                          <ModalConfirmationTrigger
                            message={<FormattedMessage id="contacts.modal.reactivateSubscriptions" />}
                            onConfirm={async(ev, onClose) => {
                              await updateSubscriptions(formLists.map(i => {
                                if(i.hash === list.hash) {
                                  return { ...i, cancelled: false }
                                } else {
                                  return i
                                }
                              }))
                              toast.success(<FormattedMessage id="toasters.subscription.reactivated" />)
                            }}
                            confirmBtn={<FormattedMessage id="contacts.modal.reactivateBtn" />}
                            isPositive
                          >
                            <button type="button" className="badge badge-secondary btn"><span><FormattedMessage id="contacts.modal.reactivateBtn" /></span></button>
                          </ModalConfirmationTrigger> :
                          <ModalConfirmationTrigger
                            message={<FormattedMessage id="contacts.modal.cancelSubscriptions" />}
                            onConfirm={async(ev, onClose) => {
                              await updateSubscriptions(formLists.map(i => {
                                if(i.hash === list.hash) {
                                  return { ...i, cancelled: true }
                                } else {
                                  return i
                                }
                              }))
                              toast.success(<FormattedMessage id="toasters.subscription.cancelled" />)
                            }}
                            confirmBtn={<FormattedMessage id="common.cancelSubscription" />}
                          >
                            <button type="button" className="badge badge-secondary btn"><FormattedMessage id="common.cancelSubscription" /></button>
                          </ModalConfirmationTrigger>
                        }
                        <ModalConfirmationTrigger
                          onConfirm={() => confirmDelete(list.hash)}
                          message={<FormattedMessage id="common.areYouSureList" />}
                        >
                          <button type="button" className="ml-2 badge badge-danger btn"><FormattedMessage id="common.delete" /></button>
                        </ModalConfirmationTrigger>
                      </div>
                    </div>
                  </li>
                )
              }
            </ul>
            <div className="card-body">
              <button type="button" className="btn-link small font-weight-bold" onClick={isAddSubscriptionTrigger}>
                <FontAwesomeIcon icon={'plus'} className={'text-success mr-2'}/>
                <FormattedMessage id="common.addSubscriptions" />
              </button>
              {
                isAddSubscription &&
                <div className="mt-2">
                  <SelectField
                    name="lists"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value.hash}
                    options={generateListOptionsObject(lists.data, get(contact, 'data.lists'))}
                    isMulti={true}
                    maxMenuHeight={300}
                    isSearchable={true}
                    closeMenuOnSelect={false}
                    className="react-select"
                    valueKey="hash"
                    disabled={lists.isLoading || !lists.data}
                    isLoading={lists.isLoading || !lists.data}
                    arrStructure={true}
                    placeholder={<FormattedMessage id="contacts.showAllContacts" />}
                    onCreateOption={onCreateList}
                  />
                  <small className="form-text text-muted"><FormattedMessage id="contacts.addContact.addSubscriptionsSelectHelper" /></small>
                </div>
              }
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12 justify-content-end d-flex">
              <button className="btn btn-link ml-auto mr-2" onClick={_ => restProps.history.push('/contacts')}><FormattedMessage id="common.cancel" /></button>
              <ButtonSpinner
                type="submit"
                className="btn btn-success"
                spin={contact.isLoading}
                disabled={contact.isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                <FormattedMessage id="common.saveAndReturn" />
              </ButtonSpinner>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title mb-0"><FormattedMessage id="contact.contactStatus" /></h4>
            </div>
            <ul className="list-group list-group-flush small">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    <span className="d-block small text-muted">Status</span>
                    <div><FormattedMessage id="contact.activeStatus" />: {user.active ?
                    <FontAwesomeIcon
                    icon={'check'}
                    className={'text-success mr-2'}
                  /> :
                    <FontAwesomeIcon
                      icon={'times'}
                      className={'text-danger mr-2'}
                    />
                    }</div>
                  </div>
                  <div className="col">

                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    <span className="d-block small text-muted"><FormattedMessage id="common.titles.created" /></span>
                    <span className="d-block">{getDefault24TypeDateAndTime(user.created)}</span>
                  </div>
                  <div className="col">
                    <span className="d-block small text-muted"><FormattedMessage id="contact.lastUpdated" /></span>
                    <span className="d-block">{getDefault24TypeDateAndTime(user.updated)}</span>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    <span className="d-block small text-muted"><FormattedMessage id="common.actions" /></span>
                    {
                      !user.active &&
                      <ModalConfirmationTrigger
                        message={<FormattedMessage id="contacts.modal.reactivateModal" values={{ email: user.email }} />}
                        onConfirm={reactivateContact}
                        isPositive={true}
                        confirmBtn={<FormattedMessage id="contacts.modal.reactivateBtn" />}
                      >
                        <button className="btn-none p-0 pointer mr-3" type="button"><span className="link-underline"><FormattedMessage id="contacts.modal.reactivate" /></span></button>
                      </ModalConfirmationTrigger>
                    }
                    <ModalConfirmationTrigger
                      message={<FormattedMessage id="contacts.modal.areYouSure" values={{ email: user.email }} />}
                      onConfirm={() => contact.remove(user).then(_ => toast.success(<FormattedMessage id="toasters.contact.deleted" />)).then(_ => restProps.history.push('/contacts'))}
                    >
                      <button className="btn-none p-0 pointer" type="button"><span className="text-danger link-underline"><FormattedMessage id="contacts.modalHeader.deleteContacts" values={{ count: 1 }} /></span></button>
                    </ModalConfirmationTrigger>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  )
}
