import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
// ApolloProvider assumes the endpoint is at /graphql

import App from './components/App'

import SongList    from './components/SongList';
import SongDetail  from './components/SongDetail';
import SongCreate  from './components/SongCreate';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <HashRouter>
        <App>
          <Route exact path="/" component={ SongList } />
          <Route exact path="/songs/new" component={ SongCreate } />
          <Route path="/song/:id" component={ SongDetail } />
        </App>
      </HashRouter>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
