import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { compose } from 'redux'
import get from 'lodash/get'

import Dropdown from 'common/widgets/Dropdown'
import { connectResource } from 'common/utils/resource'
import { FontAwesomeIcon } from 'lib/font-awesome'
import './styles.scss'

export const DropDownLink = ({ to, name, onClick }) => (
  <Link className="dropdown-item" to={to} onClick={onClick}>
    {name}
  </Link>
);

export const DropdownDivider = () => <div className="dropdown-divider" />;

const PROFILE = [
  { name: <FormattedMessage id="appNavBar.profileDropDown.upgrade" />, to: '/upgrade' },
  { name: '_DIVIDER_' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.profile" />, to: '/account/profile' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.account" />, to: '/account' },
  { name: '_DIVIDER_' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.notifications" />, to: '/account/messages' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.settings" />, to: '/account/settings' },
  { name: '_DIVIDER_' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.senders" />, to: '/account/senders' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.api" />, to: '/account/api' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.affiliate" />, to: '/account/affiliate' },
  { name: '_DIVIDER_' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.logout" />, to: '/logged_out' }
]

const isRouteMatch = route => {
  for (let i = 0, l = CONTACTS_MATCH_URLS.length; i < l; i += 1) {
    if (route.startsWith(CONTACTS_MATCH_URLS[i])) {
      return true
    }
  }

  return false
}

// Contacts links should be active on these URL paths
const CONTACTS_MATCH_URLS = ['/contacts', '/subscriptions', '/lists', '/attributes', '/api', '/forms']

const NavBarNav = ({ show, location, profile }) => {
  const data = get(profile, 'data') || {}
  const active = isRouteMatch(location.pathname) ? 'active' : '';
  const unseenMessagesCount = data.unseen_messages

  return (
    <div className={`collapse navbar-collapse ${show ? 'show' : ''}`}>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink exact className="nav-link text-capitalize" to="/">
            <span><FormattedMessage id="common.start" /></span>
          </NavLink>
        </li>
        {/*
          Class name of Contacts link is set manually due to wired URL design.
          This URLs (see MATCH_URLS) should be nested dough. E.g. /contacts/attributes
          But by requirements URLs should match URLs in current(old) application.
          TODO: hope it will be changed later
        */}
        <li className="nav-item">
          <Link className={`nav-link text-capitalize ${active}`} to="/contacts">
            <span><FormattedMessage id="common.contacts" /></span>
          </Link>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-capitalize" to="/mails">
            <span><FormattedMessage id="common.mails" /></span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-capitalize" to="/reports">
            <span><FormattedMessage id="common.reports" /></span>
          </NavLink>
        </li>
      </ul>
      <ul className="navbar-nav navbar-nav-secondary align-items-center">
        <li className="nav-item">
          <div className="nav-link">
            <Dropdown
              buttonClasses = "btn btn-success dropdown-toggle"
              buttonContent = {<FormattedMessage id="common.create" />}
              disableButtonIcon={true}
            >
              <Link to={{
                pathname: '/lists',
                state: { showModal: true }
              }} className="dropdown-item btn btn-link"><FontAwesomeIcon className="text-primary fa-md mr-2" icon="clipboard-list" /><FormattedMessage id="appNavBar.actions.createList" /></Link>
              <Link to="/forms/regular/add" className="dropdown-item btn btn-link"><FontAwesomeIcon className="text-primary fa-md mr-2" icon="clipboard-list" /><FormattedMessage id="appNavBar.actions.createForm" /></Link>
              <Link to="/contacts/import" className="dropdown-item btn btn-link"><FontAwesomeIcon className="text-primary fa-md mr-2" icon="user-friends" /><FormattedMessage id="appNavBar.actions.import" /></Link>
              <Link to="/mails/drafts/new" className="dropdown-item btn btn-link"><FontAwesomeIcon className="text-primary fa-md mr-2" icon="envelope" /><FormattedMessage id="home.createMail" /></Link>
            </Dropdown>
          </div>
        </li>
        <li className="nav-item">
          <Link to="/account/messages" className="nav-link btn btn-link ">
            <span>
              <FontAwesomeIcon className="fa-lg" icon="bell" />
              {
                !!unseenMessagesCount && <div className="badge badge-pill badge-danger notifications-badge"></div>
              }
            </span>
          </Link>
        </li>
        <Dropdown
          className="badge badge-secondary border-0"
          toggleIcon="ellipsis-h"
          disableButtonIcon={true}
          buttonClasses="nav-link btn btn-link"
          buttonContent={<FontAwesomeIcon className="fa-lg" icon="user-circle" />}
        >
          {PROFILE.map(
            (item, id) =>
              item.name !== '_DIVIDER_' ? (
                <DropDownLink name={item.name || ''} to={item.to || ''} key={id+'dr'} />
              ) : (
                <DropdownDivider key={id+'dr'} />
              )
          )}
        </Dropdown>
      </ul>
    </div>
  );
};

NavBarNav.propTypes = {
  show: PropTypes.bool
};

export default compose(
  connectResource({
    namespace: 'profile',
    async: true,
    prefetch: false,
    endpoint: 'profile',
  }),
  withRouter,
)(NavBarNav)
