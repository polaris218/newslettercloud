import React from 'react';

export default function CustomValidationError({ messages = null }) {
  if (typeof messages === 'string') {
    return <div>{messages}</div>
  }

  if (Array.isArray(messages)) {
    return <div>{messages.map((msg, index) => <span key={index}>{msg}</span>)}</div>
  }

  return null;
};
