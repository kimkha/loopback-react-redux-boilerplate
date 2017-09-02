import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware, apiReducer } from 'restful-api-redux';
import App from './App';
import './styles/index.css';

const reducers = combineReducers({
  ...apiReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(apiMiddleware);
let store = createStore(reducers, composeEnhancers(middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
