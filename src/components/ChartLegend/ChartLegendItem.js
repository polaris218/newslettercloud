import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'

import { noop } from 'lib/utils';


export const ChartLegendItem = ({ color = '', label = '', value = 0, subscribers = 0, seeAll = noop }) => {
  return (
    <div className="chart-legend-item">
      <div className="chart-legend-item-color" style={{ backgroundColor: color }} />
      <div>
        <p className="font-weight-semi-bold">
          <span>
            {value}% {label}
          </span>
        </p>
        <p className="small">
          {value && seeAll !== noop ? (
            <span className={subscribers && "btn-link"} onClick={seeAll}>
              <FormattedMessage id="charts.countOfSubscribers" values={{subscribers}}/>
            </span>
          ) : (
            <span><FormattedMessage id="charts.countOfSubscribers" values={{subscribers}}/></span>
          )}
        </p>
      </div>
    </div>
  );
};

ChartLegendItem.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  subscribers: PropTypes.number,
  value: PropTypes.number,
  noop: PropTypes.func
};
