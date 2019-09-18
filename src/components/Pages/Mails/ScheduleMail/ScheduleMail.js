import React from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

import ListSelect from 'components/ListSelect'
import { SelectField, TextField, DateTimeField } from 'common/forms/fields'
import { required } from 'validations'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import ScheduleSuccess from './ScheduleSuccessContainer'
import Spinner from 'components/Spinner'


export default function ScheduleMail({ senderOptions, toggleAnalytic, analytics, schedule,
  formData, lists, id, onSubmit, handleSubmit, success, mailSend, ...rest }) {
  if(success) return <ScheduleSuccess {...rest} />
  return (
    <div className="container">
      <Spinner show={schedule.isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-4">
          <div className="col-8 offset-2">
            <h1><FormattedMessage id="mails.scheduleANewsletter" /></h1>
            <p>
              <FormattedMessage id="mails.youAreOnlyAStepMail" />
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
                  <TextField label={<FormattedMessage id="mails.label.chooseSubject" />} name="subject" required validate={[required]} />
                </div>
                <div className="form-group mb-0">
                  <SelectField name="sender" label={<FormattedMessage id="mails.label.chooseSender" />} options={senderOptions} required validate={[required]} />
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <h3 className="card-header h5">3. <FormattedMessage id="mails.addGoogle" /></h3>
              <div className="card-body">
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="analytics" onChange={toggleAnalytic} value={analytics} checked={analytics} />
                    <label className="custom-control-label" htmlFor="analytics">
                      <FormattedMessage id="mails.trackMyNewsletter" />
                    </label>
                  </div>
                  <small id="emailHelp" className="form-text text-muted">
                    <FormattedMessage id="mails.googleAnalyticsCanHelp" />
                  </small>
                </div>
                {
                  analytics &&
                  <div className="form-row">
                    <div className="col">
                      <TextField name="utm_source" label="Utm source" />
                    </div>
                    <div className="col">
                      <TextField name="utm_campaign" label="Utm campaign" />
                    </div>
                  </div>
                }
              </div>
            </div>

            <div className="card mb-4">
              <h3 className="card-header h5">4. <FormattedMessage id="mails.sendWhen" /></h3>
              <div className="card-body">
                <div className="form-group mb-0">
                  <DateTimeField name="sent" label={<FormattedMessage id="mails.sendWhenDate" />} minDate={moment()} required validate={[required]} />
                </div>
              </div>
            </div>

            <div className="card mb-4 border-dark">
              <div className="card-body">
                <h3 className="card-title">5. <FormattedMessage id="mails.reviewBeforeSending" /></h3>
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
                <li className="list-group-item">
                  <span className="d-block small text-muted">Google analytics</span>
                  {
                    analytics ?
                    <span><FormattedMessage id="mails.yesTheNewsletterIsTracked" /></span> :
                    <span><FormattedMessage id="mails.NoTheNewsletterIsNotTracked" /></span>
                  }
                </li>
                <li className="list-group-item">
                  <span className="d-block small text-muted"><FormattedMessage id="common.time" /></span>
                  <span>{getDefaultTypeDateAndTime(get(formData, 'sent'))}. <FormattedMessage id="mails.doYouWantToSendNowInstead" /> <Link to={`/mails/drafts/send/${id}/now`}><FormattedMessage id="mails.clickHere" /></Link></span>
                </li>
              </ul>
            </div>

           <div className="d-flex justify-content-end">
             <Link to="/mails/drafts" className="btn btn-link mr-2"><FormattedMessage id="common.cancel" /></Link>
             <button type="submit" className="btn btn-success">
               <FormattedMessage id="mails.scheduleBtn" />
             </button>
           </div>
          </div>
        </div>
      </form>
    </div>
  );
}
