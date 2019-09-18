import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ModalTrigger from 'modals/ModalTrigger'
import ReplanScheduledModal from 'modals/components/ReplanScheduledModal'
import { getDefaultTypeDateAndTime } from 'common/utils/formatDate'
import Spinner from 'components/Spinner'


export default function ScheduleSuccess(props) {
  return (
    <div className="container relative">
      <Spinner show={props.schedule.isLoading} />
      <div className="row mb-4">
        <div className="col-12">
          <h1><FormattedMessage id="mails.scheduleANewsletter" /></h1>
          <p>
            <FormattedMessage id="mails.youAreOnlyAStepScheduling" />
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title"><FormattedMessage id="mails.yourMailIsScheduled" /></h3>
              <p className="card-text">
                <FormattedMessage id="mails.yourNewsletterIsNowMover" />
              </p>
              <h3 className="cart-title mb-4">{getDefaultTypeDateAndTime(props.schedule.data.time_to_send)}</h3>
              <Link to="/mails/scheduled" className="btn btn-success"><FormattedMessage id="mails.toScheduledMails" /></Link>
              <ModalTrigger component={ReplanScheduledModal} id={props.id} onHide={props.schedule.fetch}>
                <button className="btn btn-success btn-outline-secondary ml-3"><FormattedMessage id="mails.rescheduleNow" /></button>
              </ModalTrigger>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
