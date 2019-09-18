import React, { Component } from 'react'
import get from 'lodash/get'

import { cutString } from 'common/utils/helpers'
import { FontAwesomeIcon } from 'lib/font-awesome'


export default function Column(props) {
  let {
    isTitle,
    title,
    orderable,
    format,
    field,
    orderingField = field,
    item,
    index,
    align = 'left',
    width,
    list,
    className,
    length = 255,
  } = props

  className = `${className || ''} text-${align}`
  let style = {width}

  if(isTitle) {
    let order
    let orderBy
    let direction = 'asc'

    if(orderable) { // TODO optimization
      orderBy = list.filters.data.ordering || 'index'
      if(orderBy[0] == '-') {
        direction = 'desc'
        orderBy = orderBy.substr(1)
      }
      if(orderBy === orderingField) {
        order = (
          <FontAwesomeIcon className="fa-md ml-2" icon={direction === 'asc' ? 'caret-down' : 'caret-up'} />
        )
      }

      className += ' pointer'
    }

    function reorder() {
      if(orderable && list.filters.orderBy) {
        let prefix = orderable === 'desc' ? '-' : ''
        if(orderBy === orderingField) {
          prefix = direction === 'asc' ? '-' : ''
        }
        list.filters.orderBy(`${prefix}${orderingField}`)
      }
    }

    return (
      <th style={style} className={className + ' text-clipped-column'} onClick={reorder}>
        {title}
        {order}
      </th>
    )
  }

  if(!format) {
    format = (value) => value
  }

  let printedValue = get(item, field)

  if(typeof printedValue === 'string') {
    printedValue = cutString(printedValue, length)
  }

  if(format.prototype instanceof Component) {
    const FormatTag = format;
    printedValue = <FormatTag>{printedValue}</FormatTag>
  } else {
    printedValue = format(printedValue, item, {index, field})
  }

  return (
    <td className={className + ' text-clipped-column'}>
        {printedValue}
    </td>
  )
}
