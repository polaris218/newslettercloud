import React, { Component } from 'react';

export default class PageHeader extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name || nextProps.description !== this.props.description;
  }

  render() {
    const { name, description } = this.props;

    return (
      <div className="row mb-4">
        <div className="col">
          <h1>{name}</h1>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
    );
  }
}
