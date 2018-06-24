import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import './main.css';

import configureStore from './store/configureStore';
import App from './components/App';

const link = new HttpLink({
  uri: 'http://localhost:8003/graphql',
  credentials: 'include', // esta configuracion incluye la cookie en el browser
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
);
