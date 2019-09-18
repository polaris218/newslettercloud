import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { FontAwesomeIcon } from 'lib/font-awesome'


const StatusIcon = ({ number, status }) => (
  <>
    {
      status ?
      <FontAwesomeIcon className="text-success mr-2 fa-lg fa-xl align-middle" icon="check-circle" /> :
      <span className="steps-number mr-2 align-middle">{number}</span>
    }
  </>
)

export default function HomeHeader(props) {
  const dismissHeader = props.confirmEmail && props.collectSubscribers && props.createdEmails && props.sendEmail
  const firstName = get(props.user, 'data.first_name')
  return (
    <div className="start-hero relative mb-5">
      {
        dismissHeader &&
        <div className="header-info">
          <FormattedMessage id="home.greatJob" />
          <button className="btn-link font-weight-bold" onClick={props.dismissSteps}><FormattedMessage id="home.hide" /></button>
        </div>
      }
      <div className="container">
        <div className="row mb-4 justify-content-between align-items-center">
          <div className="col-4">
            <img
              alt="hero"
              src="/img/start-steps.svg"
            />
          </div>
          <div className="col-7">
            <h1 className="mb-3"><FormattedMessage id={`${firstName ? 'home.welcome' : 'home.welcomeEmpty'}`} values={{ name: firstName }}/></h1>
            <p className="lead mb-4">
              <FormattedMessage id="home.getStarted" />
            </p>
            <div className="row mb-3">
              <div className="col">
                <StatusIcon status={props.confirmEmail} number="1" />
                <Link to="/email-confirmation" className="font-weight-bold align-middle"><FormattedMessage id="home.confirmEmail" /></Link>
              </div>
              <div className="col">
                <StatusIcon status={props.collectSubscribers} number="2" />
                <Link to="/forms/regular/add" className="font-weight-bold align-middle mr-5"><FormattedMessage id="home.collect" /></Link>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <StatusIcon status={props.createdEmails} number="3" />
                <Link to="/mails/drafts/new" className="font-weight-bold align-middle"><FormattedMessage id="home.createLetter" /></Link>
              </div>
              <div className="col">
                <StatusIcon status={props.sendEmail} number="4" />
                <Link to="/mails" className="font-weight-bold align-middle mr-5"><FormattedMessage id="home.sendLetter" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
