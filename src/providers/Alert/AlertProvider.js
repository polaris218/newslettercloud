import React, { Component } from 'react';
import { AlertContext } from './AlertContext';

let id = 1;
function getId() {
  id += 1;
  return id;
}

export class AlertProvider extends Component {
  state = { data: [] };

  setAlert = item => {
    // Wrap setState() in timeout in case of calling setAlert() multiple times at once
    setTimeout(() => {
      const newItem = { ...item, id: getId() };
      const data = [newItem, ...this.state.data];
      this.setState({ data });
    });
  };

  removeAlert = id => {
    const data = this.state.data.filter(item => item.id !== id);
    this.setState({ data });
  };

  render() {
    return (
      <AlertContext.Provider value={{ data: this.state.data, setAlert: this.setAlert, removeAlert: this.removeAlert }}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}
