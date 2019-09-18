import React from 'react';
import { ContactsPageContext } from './ContactsPageContext';

export const withContactsPage = Component => props => (
  <ContactsPageContext.Consumer>
    {contactsPage => <Component {...props} contactsPage={contactsPage} />}
  </ContactsPageContext.Consumer>
);
