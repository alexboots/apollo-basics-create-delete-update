import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { List, Button, Loader } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo';

import queryFetchSongs from '../queries/fetchSongs'
import queryDeleteSong from '../queries/deleteSong'

class SongList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleting: {}
    }
  }

  handleDeleteSong = (songId) => {

    this.setState({ deleting : { [songId]: true } })
    
    this.props.mutate({
      variables: { id: songId }
    })
    .then(response => {
      this.props.data.refetch();
      this.setState({ deleting: {} }) // Set it back to an empty object
    })
    .catch(error => {
      console.log('there was an error sending the query', error);
    })
  }

  renderSongs = () => {
    const { data } = this.props;
    const { songs } = data;

    return songs.map((song) => {

      return (
        <List.Item key={ song.id }>
          <List.Icon 
            name='delete'
            color='red'
            onClick={ () => this.handleDeleteSong(song.id) }
          />  
          <List.Content>
            { this.state.deleting[song.id] ? 
               <Loader 
                  active 
                  inline 
                  size='mini'
                /> : null
            }
            <Link to={ `/songs/${song.id}` }>
              { song.title }
            </Link>
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
