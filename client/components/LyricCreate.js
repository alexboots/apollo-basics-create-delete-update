import React, { Component } from 'react';

import { graphql } from 'react-apollo'

import { Form, Icon, Input } from 'semantic-ui-react';
import queryAddLyricToSong from '../queries/AddLyricToSong'
import queryFetchSongDetails from '../queries/fetchSongDetails'

class LyricCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lyric: '',
      mutationOccuring: false
    }
  }

  handleChange = (e, data) => {
    e.preventDefault()
    const { value } = data;
    this.setState({ lyric: value })
  }

  handleSubmit = (e, data) => {
    e.preventDefault()
    this.props.mutate({
      variables: { 
        songId: this.props.songId,
        content: this.state.lyric
      }
    })
    .then(response => {
      // Laggy UI hell yeah
      this.setState({ lyric: '' })
    })
    .catch(error => {
      console.log('oh no!', error);
    })
  }

  render() {
    return(
      <div>
        <Form onSubmit={ this.handleSubmit }>
          <Input
            icon={{
              name: 'add',
              circular: true, 
              link: true,
              onClick: this.handleSubmit
            }}
            value={ this.state.lyric }
            placeholder='Title...'
            onChange={ this.handleChange }
          />
        </Form>
      </div>
    )
  }
} 

export default graphql(queryAddLyricToSong)(LyricCreate);