import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { connectResource } from 'common/utils/resource'
import { defaultPagination } from 'common/utils/constants'
import LinksTable from './LinksTable'
import LinksWhoClickedContainer from './LinksWhoClickedContainer'


class LinksContainer extends Component {
  state = {
    selectedClick: null,
  }

  handleCheckClick = (selectedClick) => () => {
    this.setState({ selectedClick })
  }

  componentWillUnmount() {
    this.props.reportsLinks.setData(null)
    this.props.reportsLinks.setFilters(null)
  }

  render() {
    if(this.state.selectedClick) {
      return <LinksWhoClickedContainer
        id={this.props.id}
        handleCheckClick={this.handleCheckClick}
        link_id={this.state.selectedClick}
      />
    }
    return (
      <LinksTable
        selectedClick={this.state.selectedClick}
        handleCheckClick={this.handleCheckClick}
        {...this.props}
      />
    )
  }
}

export default compose(
  withRouter,
  connect((state, props) => ({ id: props.match.params.id })),
  connectResource({
    namespace: 'reportsLinks',
    endpoint: 'reports/:id/links',
    filters: {
      ordering:"-unique_clicks",
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
  }),
)(LinksContainer)
