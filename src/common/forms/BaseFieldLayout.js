import React from 'react'
import FormValidationError from 'components/FormValidationError'

const BaseFieldLayout = (props) => {
  const {
    icon,
    label,
    prefix,
    required,
    inputComponent: InputComponent,
  } = props
  
  return (
    <>
      {icon}
      {label && (
        <label htmlFor={props.name}>
          {label}
          {required && <span className='control-asterisk'>*</span>}
        </label>
      )}
      <div className='control-field'>
        <div className='control-element'>
          {prefix && <div className='control-prefix'>{prefix}</div>}
          <InputComponent
            {...props}
            {...{...props.input, required: false}}
          />
          <FormValidationError messages={props.meta.touched && props.meta.error } className="visible" />
        </div>
      </div>
    </>
  )
}

export default BaseFieldLayout
