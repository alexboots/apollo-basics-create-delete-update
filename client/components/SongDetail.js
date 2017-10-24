// React main
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// React libs
import { graphql } from 'react-apollo';
import { Loader, Header, Icon, Divider, Button } from 'semantic-ui-react';
<Divider />
// Queries
import queryFetchSongDetails from '../queries/fetchSongDetails'

// Components
import LyricList   from './LyricList';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data

    if(!song) {
      // This is not good to have to do ? 
      this.props.data.refetch()
      // This is because = when you submit a song in LyricCreate,
      //  song is no longer in this data so gets stuck loading/
      // There is probably a better solution to this.
      return (<Loader active />)
    }

    const { lyrics, id } = song

    return(
      <div>
        <Link to='/'>
          <Icon name='chevron left' />
        </Link>
        <Header size='large'>
          { song.title || "No title" }
        </Header>
        
        <Divider />
        
        <LyricList lyrics={ lyrics } />
        <LyricCreate songId={ this.props.match.params.id } />
      </div>
    )
  }
} 

export default graphql(queryFetchSongDetails, {
  options: (props) => { 
      let { params } = props.match
      return { variables: { id: params.id }
    } 
  }
})(SongDetail)