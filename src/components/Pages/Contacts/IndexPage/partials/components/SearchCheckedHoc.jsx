import React, { Component } from 'react'
import get from 'lodash/get'

export default function SearchCheckedHoc(ComposedComponent) {
  return class SearchCheckedContent extends Component {
    state = {
      content: '',
      checkedRows: {},
      search: ''
    }

    componentWillUnmount() {
      if(get(this.props, 'contacts')) {
        this.props.contacts.resetFilters(null)
      }
      if(get(this.props, 'subscriptions')) {
        this.props.subscriptions.resetFilters(null)
      }
      if(get(this.props, 'attributes')) {
        this.props.attributes.resetFilters(null)
      }
      if(get(this.props, 'lists')) {
        this.props.lists.resetFilters(null)
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(get(prevProps, 'contacts.filters.search') !== get(this.props, 'contacts.filters.search')) {
        const searchParam = get(this.props, 'contacts.filters.search')
        this.setState({ search: searchParam })
      }
      if(get(prevProps, 'subscriptions.filters.search') !== get(this.props, 'subscriptions.filters.search')) {
        const searchParam = get(this.props, 'subscriptions.filters.search')
        this.setState({ search: searchParam })
      }
    }

    handleCheckRow = (email) => {
      this.setState({
        checkedRows: {
          ...this.state.checkedRows,
          [email]: !this.state.checkedRows[email]
        }
      })
    }

    clearCheckedRows = () => {
      this.setState({ checkedRows : {} })
    }

    checkAllRows = (status = true) => {
      const reducerInfo = this.props.subscriptions ? {
        reducerName: 'subscriptions',
        valueRow: 'id',
      } : this.props.contacts ? {
        reducerName: 'contacts',
        valueRow: 'email',
      } : null
      if(reducerInfo) {
        const checkedRows = this.props[reducerInfo.reducerName].data.reduce((obj, value) => {
          obj = {
            ...obj,
            [value[reducerInfo.valueRow]]: status,
          }
          return obj
        }, {})
        this.setState({ checkedRows })
      }
    }

    handleChangeSearch = (event) => {
      this.setState({search: event.target.value}, () => this.clearCheckedRows())
    }

    render() {
      return <ComposedComponent
        {...this.props}
        handleCheckRow={this.handleCheckRow}
        checkedRows={this.state.checkedRows}
        searchText={this.state.search}
        handleChangeSearch={this.handleChangeSearch}
        clearCheckedRows={this.clearCheckedRows}
        checkAllRows={this.checkAllRows}
      />
    }
  }
}



