import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'


import { noop } from 'lib/utils'
import { FontAwesomeIcon } from 'lib/font-awesome'


class PageSearch extends PureComponent {
  static propsTypes = {
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onSearch: noop,
    placeholder: '',
    disabled: false,
    value: '',
    onChange: noop
  };

  onSearch = () => {
    this.props.onSearch({})
  };

  handleChange = (e) => {
    this.props.onChange(e)
  }

  onKeyPress = event => {
    if (event.key === 'Enter') this.onSearch()
  };

  onCancelSearch = async () => {
    await this.props.onChange({ target: { value: undefined } })
    this.onSearch()
  }

  render() {
    const placeholder = this.props.intl.formatMessage({id: this.props.placeholder || 'contacts.table.search' });
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label="Search"
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyPress={this.onKeyPress}
          disabled={this.props.disabled}
        />
        <div className="input-group-append position-relative">
          {
            this.props.value &&
            <button className="btn-none pointer cancel-search" type="button" onClick={this.onCancelSearch}>
              <FontAwesomeIcon
                icon="times"
              />
            </button>
          }
          <button className="btn btn-secondary" type="button" onClick={this.onSearch} disabled={this.props.disabled}>
            <FormattedMessage id="common.search" />
          </button>
        </div>
      </div>
    );
  }
}

export default injectIntl(PageSearch)
