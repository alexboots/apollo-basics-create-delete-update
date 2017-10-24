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

const client = new ApolloClient({
  // http://dev.apollodata.com/react/cache-updates.html
    
  // Normalization with dataIdFromObject
  // If your database has unique IDs across all types of objects, you can use
  // a very simple function!
  dataIdFromObject: o => o.id

  // This takes every piece of data from the backend and runs it through
  //  o => o.id
  // "Go and fetch all the data, identify that data inside the Apollo store"
  //   "look at all the records and use that to identify that piece of data"

  // "Use the Id to identify this bit of data and to tell 
  // react whenver its updated"
  // Apollo doesn't assume you want to use the id out of the box
  //  incase you don't pass back Id's, or don't use Ids to identify records

  // This means whenver we make a query we have to ask for an Id back
  //  or we screwed

  // Without this, you need to do some fetch's and stuff thats lame as heck
  //  like using this.props.data.refetch() or 
  //  refetchQueries: [{}] stuff on this.props.mutate
  //    So it ultimately saves doing a follow up request
});

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
