import React from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ListSelect from 'components/ListSelect'
import { SelectField, TextField } from 'common/forms/fields'
import { required } from 'validations'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import TestSuccess from './TestSuccess'
import Spinner from 'components/Spinner'
import ButtonSpinner from 'components/ButtonSpinner'


export default function TestMail({ senderOptions, schedule,
  formData, lists, id, onSubmit, handleSubmit, success, mailSend, ...rest }) {
  if(success) return <TestSuccess {...rest} id={id} />
  return (
    <div className="container relative">
      <Spinner show={schedule.isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-4">
          <div className="col-8 offset-2">
            <h1><FormattedMessage id="mails.sendOutATestMail" /></h1>
            <p>
              <FormattedMessage id="mails.youAreOnlyAStepTestMail" /> <strong><FormattedMessage id="mails.receiver" /></strong> <FormattedMessage id="mails.forTestMails" />
              <FormattedMessage id="mails.ifYouWouldLikeToSend" /> <Link to={`/mails/drafts/send/${id}/now`}><FormattedMessage id="mails.clickHere" /></Link>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-8 offset-2">
            <div className="card mb-4">
              <h3 className="card-header h5">1. <FormattedMessage id="mails.chooseLists" /></h3>
              <div className="card-body">
                <p className="card-text">
                  <FormattedMessage id="mails.chooseWhichLists" />
                </p>
                <ListSelect name="lists" isMulti={true} isSearchable={true} label={<FormattedMessage id="mails.chooseLists" />} required validate={[required]} />
              </div>
            </div>

            <div className="card mb-4">
              <h3 className="card-header h5">2. <FormattedMessage id="mails.chooseSubject" /></h3>
              <div className="card-body">
                <div className="form-group">
                  <TextField label="Subject" name="subject" required validate={[required]} />
                </div>
                <div className="form-group mb-0">
                  <SelectField name="sender" label="Choose sender" options={senderOptions} required validate={[required]} />
                </div>
              </div>
            </div>
            <div className="card mb-4 border-dark">
              <div className="card-body">
                <h3 className="card-title">3. <FormattedMessage id="mails.reviewBeforeSending" /></h3>
                <p className="card-text">
                  <FormattedMessage id="mails.takeASecondAndReview" />
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="d-block small text-muted"><FormattedMessage id="common.mail" /></span>
                  <span>{formData && formData.subject}</span>
                  <ModalTrigger component={PreviewModal} previewUrl={get(schedule, 'data.preview_url')}>
                    <button type="button" className="ml-2 badge badge-secondary btn"><FormattedMessage id="common.preview" /></button>
                  </ModalTrigger>
                </li>
                <li className="list-group-item">
                  <span className="d-block small text-muted"><FormattedMessage id="common.listsTitle" /></span>
                  {
                    !!get(formData, 'lists.length') && formData.lists.map((list, index) => (
                      <span>{lists.find(i => i.hash === list).name}{index !== formData.lists.length - 1 && ', '}</span>
                    ))
                  }
                </li>
                <li className="list-group-item">
                  <span className="d-block small text-muted"><FormattedMessage id="common.sender" /></span>
                  <span>{get(formData, 'sender')}</span>
                </li>
              </ul>
            </div>
           <div className="d-flex justify-content-end">
             <Link to="/mails/drafts" className="btn btn-link mr-2"><FormattedMessage id="common.cancel" /></Link>
             <ButtonSpinner spin={mailSend.isLoading} type="submit" className="btn btn-success">
               <FormattedMessage id="common.sendOutTest" />
             </ButtonSpinner>
           </div>

          </div>
        </div>
      </form>
    </div>
  );
}
