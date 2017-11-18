import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Layout from './Layout';
import LoginScreen from '../containers/LoginScreen';
import HomeScreen from '../containers/HomeScreen';
import TestScreen from '../containers/TestScreen';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <Route path="/" render={() => <Layout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/test" component={TestScreen} />
        </Switch>
      </Layout>} />
    </Switch>
  </ConnectedRouter>
);

export default App;
