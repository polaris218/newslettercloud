import React, { Component } from 'react'

import { connectResource } from 'common/utils/resource'
import ListsPartial from './ListsPartial'
import { defaultPagination } from 'common/utils/constants'


class ListsPartialContainer extends Component {
  componentDidMount() {
    this.props.lists.filter()
  }

  componentWillUnmount() {
    this.props.lists.setData(null)
    this.props.lists.setFilters({ paginate_by: defaultPagination, page: 1 })
  }

  render() {
    return <ListsPartial {...this.props} />
  }
}

export default connectResource({
  namespace: 'lists',
  endpoint: 'lists/:hash?',
  async: true,
  idKey: 'hash',
  list: true,
  useRouter: true,
  prefetch: false,
  filters: {
    paginate_by: defaultPagination,
    ordering: 'name',
  }
})(ListsPartialContainer)
