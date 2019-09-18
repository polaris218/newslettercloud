import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { partial, noop } from 'lib/utils'
import { parseQueryParams } from 'common/utils/queryParams'

const PREV_DISABLED_BOUNDARY = 1


class Pagination extends Component {
  static propTypes = {
    allItemsCount: PropTypes.number,
    countPerPage: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    itemsType: PropTypes.node
  }

  static defaultProps = {
    allItemsCount: 0,
    countPerPage: 1,
    onChange: noop,
    disabled: false,
    itemsType: 'items'
  }

  constructor(props) {
    super(props)

    this.currentPage = 1
    const search = get(props, 'location.search')
    if(search) {
      this.currentPage = +get(parseQueryParams(search), 'page', 1)
    }
    this.state = {
      currentIndex: this.currentPage
    }
  }

  componentDidUpdate() {
    if(this.props.routerPage && +this.props.routerPage !== this.state.currentIndex){
      this.setState({ currentIndex: this.props.routerPage})
    }
  }

  shouldPrevDisabled = currentIndex => currentIndex <= PREV_DISABLED_BOUNDARY

  shouldNextDisabled = (currentIndex, numberOfPages) => currentIndex >= numberOfPages

  renderPageItems = (numberOfPages, currentIndex) => {
    const items = []
    let haveDots = false

    for (let i = 1; i <= numberOfPages; i += 1) {
      if (numberOfPages > 10 && (i > 5 && i < numberOfPages - 3)) {
        if (!haveDots) {
          items.push(
            <span href="" className="page-link" key="dots">
              ...
            </span>
          )
          haveDots = true
        }

        continue
      }

      items.push(
        <li className={`page-item ${currentIndex === i ? 'active' : ''}`} key={i + numberOfPages}>
          <button className="page-link" onClick={partial(this.onPageItemClick, i)}>
            {i}
          </button>
        </li>
      )
    }

    return items
  }

  getNumberOfPages = (allItemsCount, countPerPage) => {
    if (!allItemsCount || !countPerPage) return 0;
    return Math.ceil(allItemsCount / countPerPage)
  }

  onPageItemClick = (index, event) => {
    event.preventDefault()
    if (this.state.currentIndex === index || this.props.disabled) return
    this.setState({ currentIndex: index }, partial(this.props.onChange, { currentIndex: index }))
    if(this.props.tableId) {
      const offset = document.getElementById(this.props.tableId).offsetTop
      window.scrollTo(0, offset);
    }
  }

  onNextClick = event => {
    this.onPageItemClick(this.state.currentIndex + 1, event)
  };

  onPrevClick = event => {
    this.onPageItemClick(this.state.currentIndex - 1, event)
  };

  shouldComponentUpdate(newProps, newState) {
    return newProps.allItemsCount !== this.props.allItemsCount
     || newState.currentIndex !== this.state.currentIndex
     || !!this.props.routerPage
  }

  render() {
    const { currentIndex } = this.state

    const { allItemsCount, countPerPage } = this.props
    const numberOfPages = this.getNumberOfPages(allItemsCount, countPerPage)
    let toIndex = currentIndex * countPerPage
    let fromIndex = toIndex - countPerPage + 1

    if (toIndex > allItemsCount) {
      toIndex = allItemsCount
    }

    if (!toIndex) {
      fromIndex = 0
    }

    return (
      <>
        {numberOfPages > 1 ? (
          <nav aria-label="Pagination">
            <ul className="pagination justify-content-center noselect mt-2">
              <li className={`page-item ${this.shouldPrevDisabled(currentIndex) ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={this.onPrevClick}
                  tabIndex={this.shouldPrevDisabled(currentIndex) ? '-1' : '0'}
                  aria-label="Previous"
                >
                  <span>&lsaquo;</span>
                  <span className="sr-only"><FormattedMessage id="pagination.prev" /></span>
                </button>
              </li>

              {this.renderPageItems(numberOfPages, currentIndex)}

              <li className={`page-item ${this.shouldNextDisabled(currentIndex, numberOfPages) ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={this.onNextClick}
                  tabIndex={this.shouldNextDisabled(currentIndex, numberOfPages) ? '-1' : '0'}
                  aria-label="Next"
                >
                  <span>&rsaquo;</span>
                  <span className="sr-only"><FormattedMessage id="pagination.next" /></span>
                </button>
              </li>
            </ul>
          </nav>
        ) : null}
        <p className="text-muted font-weight-bold small text-center mb-5">
          <FormattedMessage id="common.shown">
            {content => <span>{content}</span>}
          </FormattedMessage>
          {` ${fromIndex}-${toIndex}`} <FormattedMessage id="common.shownOf" /> {`${allItemsCount} `}
          <span className="text-lowercase">{this.props.itemsType}</span>
        </p>
      </>
    )
  }
}

export default withRouter(Pagination)
