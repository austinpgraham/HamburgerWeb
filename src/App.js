import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoginForm, RegisterForm, SearchForm } from './forms';
import MyForm from './forms/MyForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (
             <Redirect to="/login" />
          )} />
          <Route path="/login" component={ LoginForm } />
          <Route path="/register" component={ RegisterForm } />
          <Route path="/search" component={ SearchForm } />
          <Route exact path="/:uid" component={ MyForm } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
