import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { compose } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'

import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'
import RecipientsPartialView from './RecipientsPartialView'


class RecipientsPartialContainer extends Component {
 
  componentDidMount() {
    this.props.recipients.filter({ ...this.props.filters })
  }

  componentDidUpdate(restProps) {
    if(restProps.endpoint !== this.props.endpoint) {
      this.props.recipients.filter({ ...this.props.filters })
    }
  }

  render() {
    return (
      <RecipientsPartialView
        {...this.props}
      />
    )
  }
}

export default compose(
  withRouter,
  connect((state, props) => {
    const endpoint = get(props, 'location.state.endpoint', 'most_active_customers')
    const filters = get(props, 'location.state.filters', {
      ordering: "-opens,-clicks,contact[email]",
      paginate_by: defaultPagination,
    })
    const label = get(props, 'location.state.label', 'Opened')
    return ({
      id: props.match.params.id,
      endpoint,
      filters,
      optionValue: {
        label: label,
        value: filters,
      },
    })
  }),
  connectResource({
    namespace: 'recipients',
    endpoint: 'reports/:id/:endpoint',
    list: true,
    prefetch: false,
    async: true,
    useRouter: true,
  }),
)(RecipientsPartialContainer)
