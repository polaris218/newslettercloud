import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';
import { noop } from '../../lib/utils';
import serviceStatus from '../../services/status';
import Spinner from '../Spinner';
import Pagination from '../Pagination';

const FIRST_PAGE_INDEX = 1;

export default class Grid extends Component {
  state = { count: 0, tableData: [], status: serviceStatus.OK, error: {} };

  // check if component is mounded before call setState() to prevent warning
  _isMounted = false;

  static propTypes = {
    isLoading: PropTypes.bool,
    paginate: PropTypes.bool,
    itemsPerPage: PropTypes.number,
    onFiltersChange: PropTypes.func,
    onResponse: PropTypes.func,
    data: PropTypes.object,
    headers: PropTypes.arrayOf(PropTypes.node),
    tableMapper: PropTypes.func,
    itemsType: PropTypes.node,
    query: PropTypes.object,
    onBodyClick: PropTypes.func
  };

  static defaultProps = {
    isLoading: false,
    paginate: true,
    itemsPerPage: 100,
    onFiltersChange: noop,
    onResponse: noop,
    data: null,
    headers: [],
    tableMapper: noop,
    itemsType: 'items',
    query: {},
    onBodyClick: noop
  };

  getData = async paginate => {
    let response;

    if (this.props.data) {
      response = this.props.data;
    } else {
      if (this._isMounted) {
        this.setState({ count: 0, tableData: [], status: serviceStatus.LOADING, error: {} });
      }

      const _paginate = {};
      if (paginate.page) {
        _paginate.page = paginate.page;
      }
      if (paginate.paginate_by) {
        _paginate.paginate_by = paginate.paginate_by;
      }
      response = await this.props.onFiltersChange({ ..._paginate, ...this.props.query });
    }

    if (!this._isMounted) return;

    if (response instanceof Error) {
      this.setState({
        count: 0,
        tableData: [],
        status: serviceStatus.ERROR,
        error: { status: response.status, message: response.message, reason: response.reason }
      });
    } else {
      this.setState(
        { count: response.count, tableData: this.props.tableMapper(response, this.getData.bind(null, 1)), status: serviceStatus.OK, error: {} },
        () => {
          this.props.onResponse(response);
        }
      );
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.onPaginationChange(FIRST_PAGE_INDEX);
  }

  onPaginationChange = ({ currentIndex = 0 }) => {
    this.getData({ page: currentIndex, paginate_by: this.props.itemsPerPage });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.onFiltersChange !== this.props.onFiltersChange || prevProps.query !== this.props.query) {
      this.onPaginationChange(FIRST_PAGE_INDEX);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { status } = this.state;
    const { headers, isLoading, itemsPerPage, paginate, tableData = this.state.tableData,
      count = this.state.count, addButtonComponent: ButtonComponent, buttonAction } = this.props;

    return (
      <div className="grid">
        {
          ButtonComponent && <ButtonComponent buttonAction={buttonAction} fetchData={this.getData.bind(null, 1)} />
        }
        <div className="row">
          <div className="col">
            <Table header={headers} rows={tableData} onBodyClick={this.props.onBodyClick} />
            <Spinner show={isLoading || status === serviceStatus.LOADING} />
          </div>
        </div>
        {paginate ? (
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <Pagination
                    allItemsCount={count}
                    countPerPage={itemsPerPage}
                    onChange={this.onPaginationChange}
                    disabled={status === serviceStatus.LOADING}
                    itemsType={this.props.itemsType}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
