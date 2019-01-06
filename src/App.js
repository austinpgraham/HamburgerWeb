import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoginForm, RegisterForm, MyForm } from './forms';

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
          <Route exact path="/search/:query" component={ MyForm } />
          <Route exact path="/:uid" component={ MyForm } />
          <Route exact path="/:uid/:listid" component={ MyForm } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
