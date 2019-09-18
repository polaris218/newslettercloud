import React, { PureComponent } from 'react'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'


const propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
}

const defaultProps = {
  inputClassName: 'input-custom',
  readOnly: false,
}

export default class PhoneInput extends PureComponent {
  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <InputMask
        {...this.props}
        className={(this.props.meta.error && this.props.meta.touched) ? 'form-control error' : 'form-control'}
        onChange={this.handleChange}
        mask="+99(999) 999-99-99"
      >
        {(inputProps) => <input {...inputProps} />}
      </InputMask>
    )
  }
}

PhoneInput.propTypes = propTypes
PhoneInput.defaultProps = defaultProps
