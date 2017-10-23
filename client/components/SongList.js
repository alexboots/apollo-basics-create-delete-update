import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import { List, Button, Loader } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo';

import queryFetchSongs from '../queries/fetchSongs'
import queryDeleteSong from '../queries/deleteSong'

class SongList extends Component {

  handleDeleteSong = (songId) => {
    this.props.mutate({
      variables: { id: songId },
      refetchQueries: [{ query: queryFetchSongs }]
    })
    .then(({ data }) => {
      console.log('??', data);
    })
    .catch(error => {
      console.log('there was an error sending the query', error);
    })
  }

  renderSongs = () => {
    const { data } = this.props;
    const { songs} = data;

    return songs.map((song) => {
      return (
        <List.Item key={ song.id }>
          <List.Icon 
            name='delete'
            color='red'
            onClick={ () => this.handleDeleteSong(song.id) }
          />
          <List.Content>
            { song.title }
          </List.Content>
        </List.Item>
      )
    });
  }

  render() {
    const { loading } = this.props.data
    return(
      <div>
        <List divided relaxed>
          { 
            loading 
              ? <Loader active inline />
              : this.renderSongs() 
          }
        </List>
        
        <Link to="/songs/new">
          <Button>
            +
          </Button>
        </Link>
      </div>
    )
  }
} 

export default compose(
  graphql(queryFetchSongs), 
  graphql(queryDeleteSong)
)(SongList);
