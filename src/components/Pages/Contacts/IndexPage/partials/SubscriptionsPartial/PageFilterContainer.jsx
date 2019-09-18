import React from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import PageFilter from './PageFilter.jsx'


class PageFilterContainer extends React.Component{
  state = {
    openFilters: false,
  }

  toggleFilters = () => {
    this.setState({ openFilters: !this.state.openFilters })
  }

  componentDidMount() {
    this.props.lists.filter()
  }

  componentWillUnmount() {
    this.props.lists.setData(null)
  }

  render() {
    return (
      <PageFilter
        {...this.props}
        openFilters={this.state.openFilters}
        toggleFilters={this.toggleFilters}
      />
    )
  }
}

export default compose(
  connectResource({
    namespace: 'subscriptions',
    endpoint: 'subscriptions',
    prefetch: false,
    useRouter: true,
    list: true,
  }),
  connectResource({
    namespace: 'lists',
    endpoint: 'lists',
    prefetch: false,
    filters: {
      paginate_by: 1000,
    },
    list: true,
  }),
)(PageFilterContainer)
