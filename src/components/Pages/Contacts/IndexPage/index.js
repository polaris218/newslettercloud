import React from 'react'
import PageHeader from 'components/PageHeader'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import PageSubNav from 'components/PageSubNav'
import Contacts from './partials/ContactsPartial'
import Subscriptions from './partials/SubscriptionsPartial'
import Lists from './partials/ListsPartial/ListsPartialContainer'
import Attributes from './partials/AttributesPartial/AttributesContainer'
import ApiForms from './partials/ApiFormsPartial/FormsContainer'
import { ContactsPageProvider } from 'providers/ContactsPage'
import { PageTitle } from 'common/widgets'


const links = [
  { name: <FormattedMessage id="common.titles.contacts" />, link: '/contacts' },
  { name: <FormattedMessage id="common.titles.subscriptions" />, link: '/subscriptions' },
  { name: <FormattedMessage id="common.titles.lists" />, link: '/lists' },
  { name: <FormattedMessage id="common.titles.attributes" />, link: '/attributes' },
  { name: <FormattedMessage id="common.titles.forms" />, link: '/forms' }
];

const ContactsPage = () => (
  <div className="container">
    <PageTitle title="title.contacts"/>
    <PageHeader
      name={
        <FormattedMessage id="common.contacts">
          {content => <span className="text-capitalize">{content}</span>}
        </FormattedMessage>
      }
    />
    <PageSubNav links={links} />
    <ContactsPageProvider>
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/subscriptions" component={Subscriptions} />
      <Route exact path="/lists" component={Lists} />
      <Route exact path="/attributes" component={Attributes} />
      <Route exact path="/forms" component={ApiForms} />
    </ContactsPageProvider>
  </div>
);

export default ContactsPage;
