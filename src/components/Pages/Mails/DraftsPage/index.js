import React from 'react';
import { Route } from 'react-router-dom';
import NewDraft from '../NewDraft';
import SendMail from '../SendMail';
import SendTestMail from '../TestMail/TestMailContainer';
import SendMailNow from '../NowMail/NowMailContainer';
import ScheduleMail from '../ScheduleMail/ScheduleMailContainer';

const DraftsPage = () => {
  return (
    <>
      <Route exact path="/mails/drafts/new" component={NewDraft} />
      <Route exact path="/mails/drafts/send/:id" component={SendMail} />
      <Route exact path="/mails/drafts/send/:id/test" component={SendTestMail} />
      <Route exact path="/mails/drafts/send/:id/now" component={SendMailNow} />
      <Route exact path="/mails/drafts/send/:id/later" component={ScheduleMail} />
    </>
  );
};

export default DraftsPage;
