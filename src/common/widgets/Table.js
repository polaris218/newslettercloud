import React, { Component } from 'react'
import get from 'lodash/get'
import range from 'lodash/range'
import { FormattedMessage } from 'react-intl'
import uuidv1 from 'uuid/v1'
import { Link } from 'react-router-dom'

import Pagination from 'components/Pagination'
import EmptyList from 'components/EmptyList'

export default class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: this.configure(props.children),
    }
    this.id = uuidv1()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: this.configure(nextProps.children)
    })
  }

  configure = (children) => {
    let columns = children.map(child => {
      return {
        type: child.type,
        ...child.props,
      }
    })

    return columns
  }

  makeTitles = () => {
    let columns = this.state.columns

    return columns.map(({type: Type, ...props}, index) => (
      <Type
        key={index}
        isTitle={true}
        list={this.props.list}
        {...props}
      />
    ))
  }

  makeRow = (item, index) => {
    let columns = this.state.columns
    let rowClassName = this.props.rowClassName || function() { return ''}

    return (
      <tr key={index} className={rowClassName(item)}>
        {columns.map(({type: Type, ...props}, i) => (
          <Type
            key={i}
            item={item}
            index={index}
            list={this.props.list}
            {...props}
          />
        ))}
      </tr>
    )
  }

  makeLoading = () => {
    let columns = this.state.columns

    return (
      <>
        {
          range(5).map(item => (
            <tr key={item}>
              {columns.map(({type: Type, ...props}, i) => {
                return <td key={i} className="cell-pending"><span>{props.mockData || 'Pending'}</span></td>
              })}
            </tr>
          ))
        }
      </>
    )
  }

  render() {
    let { list = {}, rowClassName, isLoading, paginationCount = 100, paginationLimit = 100, paginationOnChange, placeholderComponent, itemsType, routerPage, showOnly, showMorePath, ...restProps } = this.props
    let titles = this.makeTitles()
    let listLength = get(list, 'results.length')
    if(!isLoading && !get(list, 'results.length')) {
      return placeholderComponent ||
      <EmptyList
        placeholderTitle={<FormattedMessage id="tables.isEmpty" />}
      />
    }
    if(showOnly && !!get(list, 'results.length')) {
      list.results = list.results.filter((item, index) => index < showOnly)
    }
    return (
      <div>
          <table {...restProps} style={{tableLayout: 'fixed'}} className="table table-hover table-bordered table-sm" id={this.id}>
            <thead className="thead-light">
              <tr>
                { titles }
              </tr>
            </thead>
              <tbody>
                {
                  !!get(list, 'results.length') && !isLoading && list.results.map(this.makeRow)
                }
                {
                 isLoading && this.makeLoading()
                }
              </tbody>

          </table>
        {
          !showOnly && list.results && !list.results.length < paginationCount && paginationOnChange && <div className="row">
            <div className="col">
              <Pagination
                allItemsCount={paginationCount}
                countPerPage={paginationLimit}
                onChange={paginationOnChange}
                disabled={isLoading}
                itemsType={itemsType}
                routerPage={routerPage}
                tableId={this.id}
              />
            </div>
          </div>
        }
        {
          showOnly && listLength > showOnly &&
          <small>
            <FormattedMessage id="common.shown" /> {showOnly} <FormattedMessage id="common.shownOf" /> {listLength} {itemsType}. {showMorePath && <Link className="link-underline" to={showMorePath}><FormattedMessage id="common.showAll" /></Link>}
          </small>
        }
      </div>
    )
  }
}
