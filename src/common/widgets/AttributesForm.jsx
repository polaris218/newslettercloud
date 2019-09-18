import React from 'react'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'
import ModalTrigger from 'modals/ModalTrigger'

import { connectResource } from 'common/utils/resource'
import Spinner from 'components/Spinner'
import { TextField, SelectField } from 'common/forms/fields'
import AddAttributeForm from './AddAttributeForm'

import { FontAwesomeIcon } from 'lib/font-awesome'


export function AttributesForm(props) {

  return (
    <>
    <Spinner show={props.attributes && props.attributes.isLoading} />
    <div>
      <div className="row">
        <div className="col">
          {
            props.attributes.data && props.attributes.data.map((item, id) => (
              <div className="form-group" key={item.name + id}>
                <TextField name={`attributes.${item.code}`} label={item.name}/>
              </div>
            ))
          }
        </div>
      </div>
      <AddAttributeForm attributes={props.attributes}/>
    </div>
    </>
  )
}

export default compose(
  connectResource({
    namespace: 'attributes',
    endpoint: 'attributes',
    list: true,
    filters: { paginate_by: 100 },
    async: true,
  }),
)(AttributesForm)
