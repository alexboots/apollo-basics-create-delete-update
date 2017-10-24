import React, { Component } from 'react';
import { List, Button, Loader, Icon } from 'semantic-ui-react';

class LyricList extends Component {

  handleDeleteLyric = (songId) => {
    console.log('DELETEME', songId);
  }

  displayLyrics = () => {
    return this.props.lyrics.map(lyric => {
      return(
        <List.Item key={ lyric.id }>
          <List.Icon 
            name='delete'
            color='red'
            onClick={ () => this.handleDeleteLyric(lyric.id) }
          />  
          <List.Content>
            { lyric.content }
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

export default LyricList;