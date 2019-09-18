import React, { PureComponent } from 'react'
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

export default class TextareaInput extends PureComponent {
  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    const { inputClassName, inputComponent, ...restProps } = this.props
    return (
      <textarea
        {...restProps}
        className={`form-control ${(this.props.meta.touched && this.props.meta.error) && 'error'}`}
        onChange={this.handleChange}
      />
    )
  }
}

TextareaInput.propTypes = propTypes
TextareaInput.defaultProps = defaultProps
