import React, { Component } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'


const propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
}
const defaultProps = {
  inputClassName: 'select-custom',
  isClearable: false,
  isMulti: false,
  isSearchable: false,
}

class SelectInput extends Component {
  handleChange = (e, data) => {
    if(data.action ==='remove-value' && this.props.confirmationAction) {
      if(this.props.isMulti) {
        return this.props.confirmationAction(e.map(i => i.value))
      }
    }
    let value = get(e, 'value')
    if(!this.props.isMulti && (Array.isArray(this.props.value) || this.props.arrayValue)) {
      value = [e.value]
    }
    if(this.props.isMulti) {
      e = e || []
      value = e.map(i => i.value)
    }

    return this.props.onChange(value)
  }

  generateValue = (e) => {
    if(!this.props.isMulti && (Array.isArray(e) || this.props.arrayValue)) {
      return this.props.options.find(i => i.value === e[0])
    }
    if(this.props.isMulti && Array.isArray(e)) {
      return e.map(item => this.props.options.find(i => isEqual(i.value, item)))
    }

    return this.props.options.find(i => i.value === e)
  }

  render() {
    const {
      name,
      options,
      value,
      isSearchable = true,
      onBlur,
      placeholder,
      ...restProps
    } = this.props

    const CustomSelect = this.props.onCreateOption ? CreatableSelect : Select

    return (
      <CustomSelect
        {...restProps}
        name={name}
        className={`react-select ${(restProps.meta.touched && restProps.meta.error) && 'error'}`}
        value={this.generateValue(value)}
        onChange={this.handleChange}
        options={options}
        isSearchable={isSearchable}
        placeholder={placeholder || <FormattedMessage id="common.select.dots" />}
      />
    )
  }
}

SelectInput.propTypes = propTypes
SelectInput.defaultProps = defaultProps

export default SelectInput
