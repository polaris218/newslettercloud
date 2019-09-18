import React from 'react'
import { Field } from 'redux-form'
import BaseFieldLayout from './BaseFieldLayout'

const BaseFieldHOC = (Component) => {
  return function(props) {
    return (
      <Field
        component={BaseFieldLayout}
        inputComponent={Component}
        {...props}
      />
    )
  }
}

export default BaseFieldHOC
