import React, { Component } from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'
import LinksWhoClicked from './LinksWhoClicked'


class LinksWhoClickedContainer extends Component {

  componentDidMount() {
    this.props.linkClicked.filter({
      ordering: "-opens,-clicks,contact[email]",
      paginate_by: defaultPagination,
      link_id: this.props.link_id,
    })
  }

  componentWillUnmount() {
    this.props.linkClicked.setData(null)
  }

  render() {
    return (
      <LinksWhoClicked
        {...this.props}
      />
    )
  }
}

export default compose(
  connectResource({
    namespace: 'linkClicked',
    endpoint: 'reports/:id/most_active_customers',
    prefetch:false,
    list: true,
    async: true,
  }),
)(LinksWhoClickedContainer)
