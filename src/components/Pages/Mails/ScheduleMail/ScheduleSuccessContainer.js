import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { connectResource } from 'common/utils/resource'
import ScheduleSuccess from './ScheduleSuccess'


export default compose(
  connect((state, props) => ({
    id: get(props.match, 'params.id'),
  })),
  connectResource({
    namespace: 'schedule',
    endpoint: 'mails/scheduled/:id?',
    idKey: 'id',
    form: true,
    refresh: true,
    async: true,
  })
)(ScheduleSuccess)
