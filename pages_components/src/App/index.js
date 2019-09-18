import React, { Component } from 'react';
import Mail from '../lib/Mail';
import Form from '../lib/Form';

const mail = {
  user_id: 34,
  id: 456,
  data: { mail_name: 'Dummy Mail' }
};

const form = {
  user_id: 45,
  id: 23,
  data: {form_name: 'Test Form'}
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Mail model={mail} />
        <Form model={form} />
      </div>
    );
  }
}

export default App;
