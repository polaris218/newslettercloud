import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { FormattedMessage } from 'react-intl'

import PageHeader from 'components/PageHeader'
import PageSubNav from 'components/PageSubNav'
import LoadingComponent from 'components/PageLoading'
import { PageTitle } from 'common/widgets'
import PauseAccountContainer from 'components/Pages/PauseAccount/PauseAccountContainer'
import DeleteAccountContainer from 'components/Pages/DeleteAccount/DeleteAccountContainer'


import './styles.scss';

const links = [
  { name: <FormattedMessage id="appNavBar.profileDropDown.profile" />, link: '/account/profile' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.account" />, link: '/account', exact: true },
  { name: <FormattedMessage id="appNavBar.profileDropDown.notifications" />, link: '/account/messages' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.settings" />, link: '/account/settings' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.senders" />, link: '/account/senders' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.api" />, link: '/account/api' },
  { name: <FormattedMessage id="appNavBar.profileDropDown.affiliate" />, link: '/account/affiliate' }
];

const Account = Loadable({
  loader: () => import('./partials/AccountPartial'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Profile = Loadable({
  loader: () => import('./partials/ProfilePartial'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Notifications = Loadable({
  loader: () => import('./partials/NotificationsPartial'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Settings = Loadable({
  loader: () => import('./partials/SettingsPartial'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Senders = Loadable({
  loader: () => import('./partials/SendersPartial/SendersPartialContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Api = Loadable({
  loader: () => import('./partials/ApiPartial/ApiPartial'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Affiliate = Loadable({
  loader: () => import('./partials/AffiliatePartial'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

export default class AccountPage extends PureComponent {
  render() {
    return (
      <div className="container">
        <PageHeader name={<FormattedMessage id="title.myAccount" />} />
        <PageTitle title="title.myAccount"/>
        <PageSubNav links={links} />

        <Route exact path="/account" component={Account} />
        <Route exact path="/account/profile" component={Profile} />
        <Route exact path="/account/messages" component={Notifications} />
        <Route exact path="/account/settings" component={Settings} />
        <Route exact path="/account/senders" component={Senders} />
        <Route path="/account/api" component={Api} />
        <Route path="/account/affiliate" component={Affiliate} />
        <Route exact path="/account/delete" component={DeleteAccountContainer} />
        <Route exact path="/account/pause" component={PauseAccountContainer} />
      </div>
    );
  }
}
