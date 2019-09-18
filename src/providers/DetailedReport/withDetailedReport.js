import React from 'react';
import { DetailedReportContext } from './DetailedReportContext';

export const withDetailedReport = Component => props => (
  <DetailedReportContext.Consumer>
    {detailedReport => <Component {...props} detailedReport={detailedReport} />}
  </DetailedReportContext.Consumer>
);
