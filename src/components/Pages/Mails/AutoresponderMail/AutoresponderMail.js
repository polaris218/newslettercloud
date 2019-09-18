import React from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ListSelect from 'components/ListSelect'
import { SelectField, TextField } from 'common/forms/fields'
import { generateHours, formatSendAfter } from 'common/utils/helpers'
import { required } from 'validations'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import AutoresponderSuccess from './AutoresponderSuccess'
import Spinner from 'components/Spinner'
import ButtonSpinner from 'components/ButtonSpinner'


export default function AutoresponderMail({ senderOptions, schedule,
  formData, lists, id, onSubmit, handleSubmit, success, responders, ...rest }) {
  const sender = get(formData, 'sender') && senderOptions.find(i => i.value === get(formData, 'sender')).label
  if(success) return <AutoresponderSuccess {...rest} responders={responders.data} sender={sender && sender.split(', ')} />
  return (
    <div className="container relative">
      <Spinner show={schedule.isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-4">
          <div className="col-8 offset-2">
            <h1><FormattedMessage id="mails.startAutoresponder" /></h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <div className="card mb-4">
              <h3 className="card-header h5">1. <FormattedMessage id="mails.chooseLists" /></h3>
              <div className="card-body">
                <p className="card-text">
                  <FormattedMessage id="mails.chooseWhichList" />
                </p>
                <ListSelect name="list" isSearchable={true} label={<FormattedMessage id="mails.chooseLists" />} required validate={[required]} />
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
              <h3 className="card-header h5">3. <FormattedMessage id="mails.chooseSendDayAndTime" /></h3>
              <div className="card-body">
                <div className="form-group">
                  <div className="row">
                    <div className="col text-left">
                      <TextField type="number" label={<FormattedMessage id="mails.chooseSendDay" />} name="time_to_send.days" validate={[ required ]} required />
                    </div>
                    <div className="col text-left">
                      <SelectField required label={<FormattedMessage id="mails.chooseSendHour" />} name="time_to_send.hours" options={generateHours()} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4 border-dark">
              <div className="card-body">
                <h3 className="card-title">4. <FormattedMessage id="mails.reviewBeforeSending" /></h3>
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
                    !!get(formData, 'list') &&
                    <span>{lists.find(i => i.hash === formData.list).name}</span>
                  }
                </li>
                <li className="list-group-item">
                  <span className="d-block small text-muted"><FormattedMessage id="common.sender" /></span>
                  <span>{sender}</span>
                </li>
                <li className="list-group-item">
                  <span className="d-block small text-muted"><FormattedMessage id="common.time" /></span>
                  <span>{formatSendAfter(get(formData, 'time_to_send'))}</span>
                </li>
              </ul>
            </div>
            <div class="text-right">
              <Link to="/mails/drafts" className="btn btn-link mr-2"><FormattedMessage id="common.cancel" /></Link>
              <ButtonSpinner spin={responders.isLoading} type="submit" className="btn btn-success">
                <FormattedMessage id="mails.startAutoresponder" />
              </ButtonSpinner>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
