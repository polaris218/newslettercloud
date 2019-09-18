import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'; 
import Mail from './Mail';

const renderMail = (mail) => {
  return renderToStaticMarkup(
    <Mail model={mail}/>
  );
};

export default renderMail;
