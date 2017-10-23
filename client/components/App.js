import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react';


import SongList    from './SongList';
import SongDetail  from './SongDetail';
import SongCreate  from './SongCreate';
import LyricList   from './LyricList';
import LyricCreate from './LyricCreate';

class App extends Component {

  
  render() {
    const { children } = this.props;
    return (
      <Container>
        { children }
      </Container>
    )
  }
}

export default App;