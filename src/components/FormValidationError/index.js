import React from 'react';

let key = 1;
const getKey = () => key += 1;

const FormValidationError = ({ messages = null, className }) => {
  if (typeof messages === 'string' || typeof messages === 'object') {
    return <div className={`invalid-feedback ${className}`}>{messages}</div>;
  }

  if (Array.isArray(messages)) {
    return messages.map(msg => <div className={`invalid-feedback ${className}`} key={getKey()}>{msg}</div>);
  }

  return null;
};

export default FormValidationError;
