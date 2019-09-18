import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { connectResource } from 'common/utils/resource'
import { SelectField } from 'common/forms/fields'
import { generateListOptions } from 'common/utils/helpers'


class ListSelect extends Component {
  render() {
    return <SelectField {...this.props} options={this.props.options} />
  }
}

export default compose(
  connectResource({
    namespace: 'lists',
    endpoint: 'lists',
    refresh: true,
    async: true,
    list: true,
    filters: {
      paginate_by: 1000,
    }
  }),
  connect((state, props) => ({
    options: generateListOptions(get(state.resource, 'lists.data')),
  })),
)(ListSelect)
