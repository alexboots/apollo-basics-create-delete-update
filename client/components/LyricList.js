import React, { Component } from 'react';
import { List, Button, Loader, Icon } from 'semantic-ui-react';

import { graphql } from 'react-apollo'
import queryLikeLyric from '../queries/likeLyric'


class LyricList extends Component {

  handleLike = (lyricId, likes) => {
    this.props.mutate({
      variables: { id: lyricId },
      optimisticResponse: {
        // We MUST let the optimisticResponse know we are making a mutation
        __typename: 'Mutation',
        // You can go to network tab and grab this info
        likeLyric: {
          id: lyricId,
          likes: likes + 1 // guessing it'll add 1 or WHAT ELSE COUOLD HAPPEN DUH
        }
      }
    })
    .then(response => {
      
    })
    .error(error => {
      console.log('error or whatever', error);
    })
  }

  displayLyrics = () => {
    return this.props.lyrics.map(lyric => {
      return(
        <List.Item key={ lyric.id }>
          <List.Icon 
            name='thumbs outline up'
            color='green'
            onClick={ () => this.handleLike(lyric.id, lyric.likes) }
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