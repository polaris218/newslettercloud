import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { compose } from 'redux'

import { getCookie } from 'lib/utils'
import { PrivateRoute } from 'common/widgets'
import { connectResource } from 'common/utils/resource'
// Pages
import AddForm from 'components/Pages/Forms/AddForm'
import AddPopupForm from 'components/Pages/Forms/AddPopupForm'
import AddRegularForm from 'components/Pages/Forms/AddRegularForm/AddRegularFormContainer'
import LoadingComponent from 'components/PageLoading'
import NotFound from 'components/Pages/NotFound'
import SigninContainer from 'components/Pages/Auth/SigninContainer'
// Layouts
import AppLayout from './AppLayout'
import SigninLayout from 'components/Pages/Auth/SigninLayout'
import SignupLayout from 'components/Pages/Auth/SignupLayout'


const Home = Loadable({
  loader: () => import('../Pages/Home'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Contacts = Loadable({
  loader: () => import('../Pages/Contacts'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Mails = Loadable({
  loader: () => import('../Pages/Mails'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const StartAutoresponder = Loadable({
  loader: () => import('../Pages/Mails/AutoresponderMail/AutoresponderMailContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Reports = Loadable({
  loader: () => import('../Pages/Reports'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const DetailedReport = Loadable({
  loader: () => import('../Pages/DetailedReport/DetailedReportContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Support = Loadable({
  loader: () => import('../Pages/Support'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Privacy = Loadable({
  loader: () => import('../Pages/Privacy'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Terms = Loadable({
  loader: () => import('../Pages/Terms'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Account = Loadable({
  loader: () => import('../Pages/Account'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Upgrade = Loadable({
  loader: () => import('../Pages/Upgrade'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const SignUp = Loadable({
  loader: () => import('../Pages/Auth/SignupContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Forgot = Loadable({
  loader: () => import('../Pages/Auth/ForgotPasswordContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const Reset = Loadable({
  loader: () => import('../Pages/Auth/ResetPasswordContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const LoggedOut = Loadable({
  loader: () => import('../Pages/LoggedOut/LoggedOutContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});

const EmailConfirmation = Loadable({
  loader: () => import('../Pages/EmailConfirmation/EmailConfirmationContainer'),
  loading: LoadingComponent,
  timeout: 10000,
  delay: 200
});


const Routes = ({ token, profile }) =>{
  const isContactBased = get(profile, 'data.subscription.is_contact_based')
  return (
  <Switch>
    <AppLayout>
      <Route path="/auth" render={() => (
        <Switch>
          <PrivateRoute needRedirect={!token} redirectTo="/" exact path="/auth/signin" layout={SigninLayout} component={SigninContainer} />
          <PrivateRoute needRedirect={!token} redirectTo="/" exact path="/auth/signup" layout={SignupLayout} component={SignUp} />
          <PrivateRoute needRedirect={!token} redirectTo="/" exact path="/auth/forgot" layout={SigninLayout} component={Forgot} />
          <PrivateRoute needRedirect={!token} redirectTo="/" exact path="/auth/reset/:uidb64/:token" layout={SigninLayout} component={Reset} />
          <Redirect to="/auth/signin" />
        </Switch>
      )}>

      </Route>
      <Route needRedirect={!token} redirectTo="/" exact path="/logged_out" component={LoggedOut} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/" component={Home} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" path="/email-confirmation/:id?" component={EmailConfirmation} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" path="/contacts" component={Contacts} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/subscriptions" component={Contacts} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/attributes" component={Contacts} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/lists" component={Contacts} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/forms" component={Contacts} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/forms/add/popup" component={AddPopupForm} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/forms/regular/add" component={AddRegularForm} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/forms/regular/edit/:id" component={AddRegularForm} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" path="/mails" component={Mails} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" path="/responders/start/:id" component={StartAutoresponder} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/reports" component={Reports} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" path="/reports/:id" component={DetailedReport} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" exact path="/support" component={Support} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" path="/account" component={Account} />
      <PrivateRoute needRedirect={token} redirectTo="/auth/signin" path="/upgrade" component={Upgrade} />
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/404" component={NotFound} />
      {/*<Redirect to="/404" />*/}
    </AppLayout>
  </Switch>
)}

export default compose(
  withRouter,
  connect(state => ({
    token: get(state.resource, 'session.data.token') || getCookie('jwt')
  })),
  connectResource({
    namespace: 'profile',
    prefetch: false,
    async: true,
  })
)(Routes)

