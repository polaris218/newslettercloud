import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import PageHeader from 'components/PageHeader'
import PageTabSwitcher from 'components/PageTabSwitcher'
import ReportsTableContainer from './ReportsTableContainer'
import { PageTitle } from 'common/widgets'


const tabs = [
  { name: <FormattedMessage id="reports.tab.newsletters" />, value: 0 },
  { name: <FormattedMessage id="reports.tab.autoresponders" />, value: 1 }
]

export default class ReportsPage extends PureComponent {
  state = { type: tabs[0].value };

  onTabSelect = (value, event) => {
    event.preventDefault();
    this.setState({ type: value });
  };

  render() {
    return (
      <div className="container">
        <PageTitle title="title.reports"/>
        <PageHeader
          name={
            <FormattedMessage id="common.reports">
              {content => <span className="text-capitalize">{content}</span>}
            </FormattedMessage>
          }
        />

        <PageTabSwitcher onSelect={this.onTabSelect} selected={this.state.type} tabs={tabs} />

        <ReportsTableContainer {...this.state} />
      </div>
    );
  }
}
