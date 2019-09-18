import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


const SaveMoney = () => {
  return (
    <div>
      <p><FormattedMessage id="deleteAccount.saveMoney.emailMarketing" /></p>
      <p><FormattedMessage id="deleteAccount.saveMoney.didYouKnow" /><Link to="/upgrade"><FormattedMessage id="deleteAccount.saveMoney.didYouKnowLink" /></Link></p>
    </div>
  )
}

const TechnicalPropblem = () => {
  return (
    <div>
      <p><FormattedMessage id="deleteAccount.technicalProblem.sorry" /></p>
      <ul>
        <li><FormattedMessage id="deleteAccount.technicalProblem.emailUs" values={{ link: <a href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL_LINK}`}>{process.env.REACT_APP_SUPPORT_EMAIL_LINK}</a> }} /></li>
        <li><FormattedMessage id="deleteAccount.technicalProblem.visitOur" values={{ link: <a href={process.env.REACT_APP_HELP_LINK} target="_blank">help area</a> }} /></li>
      </ul>
    </div>
  )
}

const NoResults = () => {
  return (
    <div>
      <p><FormattedMessage id="deleteAccount.noResults.sorry" /></p>
      <ul>
        <li><a href={process.env.REACT_APP_DELETE_7TIPS_LINK} target="_blank"><FormattedMessage id="deleteAccount.noResults.7tips" /></a></li>
        <li><a href={process.env.REACT_APP_DELETE_5TIPS_LINK} target="_blank"><FormattedMessage id="deleteAccount.noResults.5tips" /></a></li>
        <li><a href={process.env.REACT_APP_DELETE_TIPS_LINK} target="_blank"><FormattedMessage id="deleteAccount.noResults.tips" /></a></li>
      </ul>
    </div>
  )
}

const AnotherTool = () => {
  return (
    <div>
      <p><FormattedMessage id="deleteAccount.anotherTool.sad" /></p>
      <ul>
        <li><FormattedMessage id="deleteAccount.anotherTool.blockEditor" /></li>
        <li><FormattedMessage id="deleteAccount.anotherTool.unlimited" /></li>
        <li><FormattedMessage id="deleteAccount.anotherTool.statistics" /></li>
        <li><FormattedMessage id="deleteAccount.anotherTool.simple" /></li>
        <li><FormattedMessage id="deleteAccount.anotherTool.complete" /></li>
        <li><FormattedMessage id="deleteAccount.anotherTool.subscription" /></li>
        <li><FormattedMessage id="deleteAccount.anotherTool.free" /></li>
      </ul>
    </div>
  )
}

const NoContacts = () => {
  return (
    <div>
      <p><FormattedMessage id="deleteAccount.noContacts.understand" /></p>
      <ul>
        <li><FormattedMessage id="deleteAccount.noContacts.tell" /></li>
        <li><FormattedMessage id="deleteAccount.noContacts.ask" /></li>
        <li><FormattedMessage id="deleteAccount.noContacts.create" /></li>
        <li><FormattedMessage id="deleteAccount.noContacts.link" /></li>
        <li><FormattedMessage id="deleteAccount.noContacts.leave" /></li>
        <li><FormattedMessage id="deleteAccount.noContacts.share" /></li>
        <li><FormattedMessage id="deleteAccount.noContacts.organize" /></li>
      </ul>
    </div>
  )
}

const ClosingBusiness = () => {
  return (
    <div>
      <p><FormattedMessage id="deleteAccount.closingBusiness" /></p>
    </div>
  )
}

const Other = () => {
  return (
    <div>
      <p><FormattedMessage id="deleteAccount.other.before" /></p>

      <p>
        <strong><FormattedMessage id="deleteAccount.other.percent" /></strong><br />
        <FormattedMessage id="deleteAccount.other.more" />
      </p>
      <p>
        <strong><FormattedMessage id="deleteAccount.other.average" /></strong><br />
        <FormattedMessage id="deleteAccount.other.organic" />
      </p>
      <p>
        <strong><FormattedMessage id="deleteAccount.other.emails" /></strong><br />
        <FormattedMessage id="deleteAccount.other.email" />
      </p>
    </div>
  )
}

export const deleteQuiz = [
  {
    name: 'delete',
    id: 'technical-reason',
    label: <FormattedMessage id="deleteAccount.radios.technical" />,
    component: TechnicalPropblem,
  },
  {
    name: 'delete',
    id: 'economic-reason',
    label: <FormattedMessage id="deleteAccount.radios.save" />,
    component: SaveMoney,
  },
  {
    name: 'delete',
    id: 'value-reason',
    label: <FormattedMessage id="deleteAccount.radios.getting" />,
    component: NoResults,
  },
  {
    name: 'delete',
    id: 'competitor-reason',
    label: <FormattedMessage id="deleteAccount.radios.switching" />,
    component: AnotherTool,
  },
  {
    name: 'delete',
    id: 'contacts-reason',
    label: <FormattedMessage id="deleteAccount.radios.enough" />,
    component: NoContacts,
  },
  {
    name: 'delete',
    id: 'company-reason',
    label: <FormattedMessage id="deleteAccount.radios.closing" />,
    component: ClosingBusiness,
  },
  {
    name: 'delete',
    id: 'other-reason',
    label: <FormattedMessage id="deleteAccount.radios.other" />,
    component: Other,
  },
]
