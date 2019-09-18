import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'

import { parseQueryParams } from 'common/utils/queryParams'
import { connectResource } from 'common/utils/resource'
import NewCreditCard from './NewCreditCard'


class NewCreditCardContainer extends React.Component {

  componentDidMount() {
    if(this.props.requestData) {
      this.props.payOrder.create(this.props.requestData)
    }
  }

  render() {
    return (
      <NewCreditCard
        {...this.props}
      />
    )
  }
}

export default compose(
  connect((state,props) => ({
    requestData: parseQueryParams(get(props,'location.search',''))
  })),
  connectResource({
    namespace: 'payOrder',
    endpoint: 'pay_order',
    prefetch: false,
  }),
)(NewCreditCardContainer)
