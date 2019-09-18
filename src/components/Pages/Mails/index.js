import React from 'react'
import { Route } from 'react-router-dom'

import IndexPage from './IndexPage'
import DraftsPage from './DraftsPage'
import CreateTemplates from './CreateTemplates'
import AdvancedTemplateContainer from './AdvancedEditorPages/AdvancedTemplateContainer'
import AdvancedMailContainer from './AdvancedEditorPages/AdvancedMailContainer'
import PendingPreviewContainer from './PendingPreview/PendingPreviewContainer.jsx'


const MailsPage = () => {
  return (
    <>
      <Route exact path="/mails" component={IndexPage} />
      <Route exact path="/mails/drafts" component={IndexPage} />
      <Route exact path="/mails/autoresponders" component={IndexPage} />
      <Route exact path="/mails/scheduled" component={IndexPage} />
      <Route exact path="/mails/sent" component={IndexPage} />
      <Route exact path="/mails/stopped" component={IndexPage} />
      <Route exact path="/mails/pending" component={IndexPage} />
      <Route exact path="/mails/templates" component={IndexPage} />
      <Route exact path="/mails/templates/advanced/detail/:id?" component={AdvancedTemplateContainer} />
      <Route exact path="/mails/advanced/detail/:id?" component={AdvancedMailContainer} />
      <Route exact path="/mails/templates/create" component={CreateTemplates} />
      <Route exact path="/mails/pending_review" component={PendingPreviewContainer} />
      <Route exact path="/mails/drafts/*" component={DraftsPage} />
    </>
  );
};

export default MailsPage
