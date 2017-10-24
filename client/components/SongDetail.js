import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import { Loader } from 'semantic-ui-react';

import queryFetchSongDetails from '../queries/fetchSongDetails'


class SongDetail extends Component {
  render() {
    const { song } = this.props.data

    console.log("song", song);

    if(!song) {
      return (<Loader active />)
    }

    return(
      <div>
        <h3>{ song.title }</h3>
        <span>{ song.lyrics }</span>
        <Link to='/'>Home</Link>
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