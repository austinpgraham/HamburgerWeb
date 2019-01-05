import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoginForm, RegisterForm, HomeForm, SearchForm } from './forms';

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
          <Route exact path="/:uid" component={ HomeForm } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
