import React from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ListSelect from 'components/ListSelect'
import { SelectField, TextField } from 'common/forms/fields'
import { required } from 'validations'
import ModalTrigger from 'modals/ModalTrigger'
import PreviewModal from 'modals/components/PreviewModal'
import NowSuccess from './NowSuccess'
import Spinner from 'components/Spinner'
import ExtraMailModal from 'components/Pages/Mails/ExtraMailModal'
import PaymentModal from 'modals/components/PaymentModal'
import { getPaymentUrl } from 'common/utils/helpers'


export default function NowMail({ senderOptions, toggleAnalytic, analytics, nowMail,
  formData, lists, id, onSubmit, handleSubmit, success, mailSend, missingEmail, extraEmail,
  missingEmailTrigger, extraMailTrigger, extra_price, order_id, history, ...rest }) {
  if(success) return <NowSuccess {...rest} nowMail={nowMail.data} />
  return (
    <div className="container relative">
      <Spinner show={nowMail.isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-4">
          <div className="col-8 offset-2">
            <h1><FormattedMessage id="mails.sendOutANewsletter" /></h1>
            <p>
              <FormattedMessage id="mails.youAreOnlyAStep" /> <Link to={`/mails/drafts/send/${id}/test`}><FormattedMessage id="mails.clickHere" /></Link>
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
                  <ModalTrigger component={PreviewModal} previewUrl={get(nowMail, 'data.preview_url')}>
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
                  <span className="d-block small text-muted"><FormattedMessage id="mails.googleAnalytics" /></span>
                  {
                    analytics ?
                    <span><FormattedMessage id="mails.yesTheNewsletterIsTracked" /></span> :
                    <span><FormattedMessage id="mails.NoTheNewsletterIsNotTracked" /></span>
                  }
                </li>
                <li className="list-group-item">
                  <span className="d-block small text-muted"><FormattedMessage id="common.time" /></span>
                  <span><FormattedMessage id="mails.doYouWantToScheduleYourMail" /> <Link to={`/mails/drafts/send/${id}/later`}><FormattedMessage id="mails.clickHere" /></Link></span>
                </li>
              </ul>
            </div>

           <div className="d-flex justify-content-end">
             <Link to="/mails/drafts" className="btn btn-link mr-2"><FormattedMessage id="common.cancel" /></Link>
             <button type="submit" className="btn btn-success">
               <FormattedMessage id="common.sendOut" />
             </button>
           </div>
          </div>
        </div>
      </form>
      {
        missingEmail &&
        <ExtraMailModal onClose={missingEmailTrigger} buyExtraMails={extraMailTrigger} upgradeAccount={() => history.push('/upgrade')} extra_price={extra_price} />
      }
      {
        extraEmail &&
        <PaymentModal
          onClose={extraMailTrigger}
          filters={{
            order_id: order_id,
            accepturl: getPaymentUrl(`upgrade/pay-by-card/accept/`),
            cancelurl: getPaymentUrl(`upgrade/cancel/`),
          }}
          amount={extra_price.toFixed(2) * 1.25}
        />
      }
    </div>
  );
}
