import React, { Component } from 'react'
import { compose } from 'redux'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { connectResource } from 'common/utils/resource'
import ReportsTable from './ReportsTable'
import { defaultPagination } from 'common/utils/constants'
import API from 'api'


class ReportsTableContainer extends Component {
  state = {
    additional: false,
  };

  removeWithMail = event => {
    this.setState({ additional: !this.state.additional })
  }

  copyDraft = (id) => {
    return API(`mails/all/${id}/clone`).post()
      .then(_ => toast.success(<FormattedMessage id="toasters.autoresponder.copied" />))
      .then(res => this.props.history.push('/mails/drafts'))
  }

  removeReport = (data) => {
    return this.props.reports.remove(data)
      .then(_ => toast.success(<FormattedMessage id="toasters.report.deleted" />))
  }

  removeMail = (id) => {
    return API(`mails/all/${id}`).delete()
      .then(_ => toast.success(<FormattedMessage id="toasters.mail.deleted" />))
  }

  componentDidMount() {
    this.props.reports.filter({ type: this.props.type })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.type !== this.props.type) {
      this.props.reports.filter({ type: this.props.type })
    }
  }

  componentWillUnmount() {
    this.props.reports.setData(null)
    this.props.reports.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <ReportsTable {...this.props} copyDraft={this.copyDraft} removeReport={this.removeReport} removeMail={this.removeMail} />
  }
}

export default compose(
  connectResource({
    namespace: 'reports',
    endpoint: 'reports',
    idKey: 'id',
    useRouter: true,
    filters: {
      paginate_by: defaultPagination,
    },
    async: true,
    list: true,
    prefetch: false,
  }),
  withRouter
)(ReportsTableContainer)
