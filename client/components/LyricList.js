import React, { Component } from 'react';
import { List, Button, Loader, Icon } from 'semantic-ui-react';

import { graphql } from 'react-apollo'
import queryLikeLyric from '../queries/likeLyric'
import queryFetchSongDetails from '../queries/fetchSongDetails'

class LyricList extends Component {

  handleLike = (lyricId) => {
    this.props.mutate({
      variables: { id: lyricId }
    })
    .then(response => {
      console.log('response', response);
    })
  }

  displayLyrics = () => {
    return this.props.lyrics.map(lyric => {
      console.log('lyric', lyric);
      console.log('lyric', lyric.likes);
      return(
        <List.Item key={ lyric.id }>
          <List.Icon 
            name='thumbs outline up'
            color='green'
            onClick={ () => this.handleLike(lyric.id) }
          />  
          <List.Content>
            { lyric.content } | { lyric.likes || '0' }
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    return(
      <List divided relaxed>
        { this.displayLyrics() }
      </List>
    )
  }
} 

export default graphql(queryLikeLyric)(LyricList);