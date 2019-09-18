import React from 'react'
import { Route, Switch } from 'react-router-dom'

import IndexPage from './IndexPage'
import IndexImportPage from './ImportContacts/IndexPage';
import ImportFromTextContainer from './ImportContacts/ImportFromTextContainer';
import ImportFromFileContainer from './ImportContacts/ImportFromFileContainer';
import ContactPage from './ContactPage'

const ContactsPage = () => (
  <Switch>
    <Route exact path="/contacts" component={IndexPage} />
    <Route exact path="/contacts/import" component={IndexImportPage} />
    <Route exact path="/contacts/import/text" component={ImportFromTextContainer} />
    <Route exact path="/contacts/import/file/:hash?" component={ImportFromFileContainer} />
    <Route exact path="/contacts/:id" component={ContactPage} />
    <Route exact path="/subscriptions" component={IndexPage} />
    <Route exact path="/lists" component={IndexPage} />
    <Route exact path="/attributes" component={IndexPage} />
    <Route exact path="/forms" component={IndexPage} />
  </Switch>
)

export default ContactsPage
