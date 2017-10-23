import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import { Segment, Button, Loader } from 'semantic-ui-react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {

  renderSongs() {
    const { data } = this.props;
    const { songs} = data;

    return songs.map((song) => {
      return (
        <Segment as="li" key={ song.id }>
          { song.title }
        </Segment>
      )
    });
  }

  render() {
    const { loading } = this.props.data
    return(
      <Segment.Group as="ul">
        { 
          loading 
            ? <Loader active inline />
            : this.renderSongs() 
        }
        
        <hr /> 
        <Link to="/songs/new">
          <Button>
            +
          </Button>
        </Link>
      </Segment.Group>
    )
  }
} 

const query = gql`{
  songs {
    title,
    id
  }
}`;

export default graphql(query)(SongList);
