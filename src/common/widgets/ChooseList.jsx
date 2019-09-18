import React from 'react'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'

import { connectResource } from 'common/utils/resource'


function ChooseList({ lists, onChange, ...restProps }) {
  return (
    <Select
      {...restProps}
      disabled={lists.isLoading || !lists.data}
      isLoading={lists.isLoading || !lists.data}
      placeholder={<FormattedMessage id="contacts.showAllContacts" />}
      options={lists.data}
      onChange={(value) => {
        onChange(value)
      }}
      maxMenuHeight={300}
      isSearchable={true}
      className="react-select"
      getOptionLabel={(option) => option['name']}
      getOptionValue={(option) => option['hash']}
    />
  )
}

export default connectResource({
  namespace: 'lists',
  endpoint: 'lists',
  filters: {
    paginate_by: 1000,
  },
  list: true,
})(ChooseList)
