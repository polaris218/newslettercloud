import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { noop, partial } from '../../lib/utils';

export class TableRow extends PureComponent {

  render() {
    const { cols } = this.props;
    return (
      <tr>
        {cols.map((col, idx) => (
          <td key={`col_${idx}`}>{col}</td>
        ))}
      </tr>
    );
  }
}

export default class Table extends PureComponent {
  static propTypes = {
    rows: PropTypes.array,
    header: PropTypes.array,
    onBodyClick: PropTypes.func
  };

  static defaultProps = {
    rows: [],
    header: [],
    onBodyClick: noop
  };

  el = React.createRef();

  render() {
    const { header, rows } = this.props;

    return (
      <div className="table">
        <table
          className="table table-hover table-bordered table-sm"
          ref={this.el}
          onClick={partial(this.props.onBodyClick, this.el.current)}
        >
          <thead className="thead-light">
            <tr>
              {header.map((item, idx) => (
                <th key={`head_col_${idx}`} className="text-capitalize">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <TableRow cols={row.cols} key={row.key} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
