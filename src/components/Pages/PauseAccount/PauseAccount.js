import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'
import moment from 'moment'

import PageHeader from 'components/PageHeader'
import ButtonSpinner from 'components/ButtonSpinner'
import Spinner from 'components/Spinner'
import { getDefaultDate } from 'common/utils/formatDate'


export default function PauseAccount({ pause, activate, confirmPause, activateAccount, pauseAccount, confirm, profile }) {
  const paused = get(profile, 'data.subscription.on_hold_since')
  const currentDate = moment(paused).diff(moment(), 'days')
  const willBePaused = paused && currentDate > 0
  return (
    <div className="row mb-4">
      <div className="col-8 offset-2">
        <div className="card mb-4">
          <Spinner show={pause.isLoading || activate.isLoading || profile.isLoading} />
          <div className="card-body p-5">
            <h2 className="card-title"><FormattedMessage id="pause.pageTitle" /></h2>
            {
              willBePaused ?
              <>
                <p>
                  <FormattedMessage id="pause.willBePaused" /><strong>{getDefaultDate(paused)}</strong>
                </p>
                <p>
                  <FormattedMessage id="pause.willBePausedDescription" values={{ date: getDefaultDate(paused) }} />
                </p>
              </> :
              <p><FormattedMessage id={paused ? 'activate.description' : 'pause.areYouSureYouWant'} /></p>
            }
            <p className="card-text text-muted">
              <FormattedMessage id={paused ? 'activate.changeMind' : 'pause.ifYouConfirm'} />
            </p>
            {
              !paused &&
              <div className="custom-control custom-checkbox mt-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="confirmDelete"
                  onChange={confirmPause}
                  value={confirm}
                  checked={confirm}
                />
                <label className="custom-control-label" htmlFor="confirmDelete">
                  <FormattedMessage id="pause.iConfirm" />
                </label>
              </div>
            }
            <div className="row pt-4">
              <div className="col">
                <Link to="/account" className="btn btn-light">
                  <FormattedMessage id="common.back" />
                </Link>
              </div>
              <div className="col text-right">
                {
                  paused ?
                  <ButtonSpinner className="btn btn-success ml-auto" onClick={activateAccount} disabled={pause.isLoading}>
                    <FormattedMessage id="activate.activateMyAccount" />
                  </ButtonSpinner> :
                  <ButtonSpinner className="btn btn-danger ml-auto" onClick={pauseAccount} disabled={pause.isLoading || !confirm}>
                    <FormattedMessage id="pause.pauseMyAccount" />
                  </ButtonSpinner>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
