import React from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import PageFilter from './PageFilter.jsx'


class PageFilterContainer extends React.Component{

  state = {
    openFilters: false,
  }

  componentDidMount() {
    this.props.lists.filter()
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.openFilters && !prevState.openFilters && this.props.contacts.filters.lists && this.props.contacts.data) {
      this.setState({ openFilters: true })
    }
  }

  componentWillUnmount() {
    this.props.lists.setData(null)
  }

  toggleFilters = () => {
    this.setState({ openFilters: !this.state.openFilters })
  }

  resetFilters = (value) => {
    this.props.contacts.resetFilters(value)
    this.props.contacts.filter()
    this.setState({ selectedOption: null })
  }

  render() {
    return (
      <PageFilter
        {...this.props}
        openFilters={this.state.openFilters}
        toggleFilters={this.toggleFilters}
        resetFilters={this.resetFilters}
      />
    )
  }
}

export default compose(
  connectResource({
    namespace: 'contacts',
    endpoint: 'contacts',
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
