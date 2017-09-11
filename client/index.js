import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware, apiReducer } from 'restful-api-redux';
import App from './App';
import './styles/index.css';

const history = createHistory();

const reducers = combineReducers({
  ...apiReducer,
  routing: routerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(apiMiddleware, routerMiddleware(history));
const store = createStore(reducers, composeEnhancers(middleware));

const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App history={history} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
