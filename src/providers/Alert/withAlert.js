import React from 'react';
import { AlertContext } from './AlertContext';

export const withAlert = Component => props => (
  <AlertContext.Consumer>
    {alert => <Component {...props} alert={alert} />}
  </AlertContext.Consumer>
);
