import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import ImportFromTextContainer from './ImportFromTextContainer';
import ImportFromFileContainer from './ImportFromFileContainer';

const ImportContacts = () => (
  <>
    <Route exact path="/contacts/import" component={IndexPage} />
    <Route exact path="/contacts/import/text" component={ImportFromTextContainer} />
    <Route exact path="/contacts/import/file/:hash?" component={ImportFromFileContainer} />
  </>
);

export default ImportContacts;
