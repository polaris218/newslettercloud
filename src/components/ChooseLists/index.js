import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import serviceStatus from '../../services/status';
import { getAllLists } from '../../services/lists';
import { noop } from '../../lib/utils';

export default class ChooseLists extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object ]),
    maxMenuHeight: PropTypes.number,
    isMulti: PropTypes.bool,
    staticOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.node
      })
    ),
    value: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.node
      })
    )
  };

  static defaultProps = {
    onChange: noop,
    disabled: false,
    placeholder: '',
    maxMenuHeight: 300,
    isMulti: true,
    staticOptions: [],
    value: []
  };

  state = { status: serviceStatus.OK, lists: [], selected: [], error: {} };
  _isMounted = false;

  getLists = async () => {
    this.setState({ status: serviceStatus.LOADING, lists: [], error: {} });
    const response = await getAllLists();

    if (!this._isMounted) return;

    if (response instanceof Error) {
      this.setState({
        status: serviceStatus.ERROR,
        lists: [],
        error: { message: response.message, status: response.status, reason: response.reason }
      });
    } else {
      this.setState({
        status: serviceStatus.OK,
        lists: [...this.props.staticOptions, ...this.mapSelectOptions(response.results)],
        error: {}
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getLists();
  }

  mapSelectOptions = lists => lists.map(list => ({ label: list.name, value: list.hash }));

  onChange = items => {
    this.setState({ selected: items });
    this.props.onChange({ target: { name: 'lists', value: items } });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Select
        options={this.state.lists}
        isMulti={this.props.isMulti}
        placeholder={this.props.placeholder}
        isLoading={this.state.status === serviceStatus.LOADING}
        onChange={this.onChange}
        isSearchable={true}
        closeMenuOnSelect={false}
        className="react-select"
        maxMenuHeight={this.props.maxMenuHeight}
        isDisabled={this.props.disabled}
        value={this.props.value}
      />
    );
  }
}
