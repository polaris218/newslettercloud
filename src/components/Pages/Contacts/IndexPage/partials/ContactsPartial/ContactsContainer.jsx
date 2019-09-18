import React, { Component } from 'react'
import { compose } from 'redux'

import { connectResource } from 'common/utils/resource'
import Contacts from './Contacts'
import SearchCheckedHoc from '../components/SearchCheckedHoc'
import { defaultPagination } from 'common/utils/constants'


class ContactsContainer extends Component {

  componentWillUnmount() {
    this.props.contacts.setData(null)
    this.props.contacts.setFilters({ paginate_by: null, page: null, search: null, list: null })
  }

  render() {
    const { contactsInfo: { count }, ...restProps } = this.props

    return <Contacts
      countOfContacts = {count}
      {...restProps}
    />

  }
}

export default compose(
  connectResource({
    namespace: 'contactsInfo',
    endpoint: 'contacts',
    async: true,
    filters: {
      paginate_by: 1,
    },
    list: true,
  }),
  connectResource({
    namespace: 'contacts',
    endpoint: 'contacts',
    filters: {
      paginate_by: defaultPagination,
    },
    list: true,
    async: true,
    useRouter: true,
  }),
  SearchCheckedHoc,
)(ContactsContainer)
