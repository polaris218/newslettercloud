import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Form from './Form';

const renderForm = (form) => {
  return renderToStaticMarkup(
    <Form model={form} />
  );
};

export default renderForm;
