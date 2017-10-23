import React, { Component } from 'react';

import { Form, Input, Label, Button } from 'semantic-ui-react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import queryAddSong from '../queries/addSong'
import queryFetchSongs from '../queries/fetchSongs'

class SongCreate extends Component {

  constructor() {
    super()

    this.state = {
      success: false,
      title: '',
      mutationOccuring: false
    }
  }
  
  handleChange = (e, data) => { 
    const { value } = data;

    this.setState({ title: value })
  }

  handleSubmit = (e, data) => {
    e.preventDefault();

    const title = this.state.title; 
    
    // Write HOC to deal w this ?
    this.setState({ mutationOccuring: true })

    this.props.mutate({
      variables: { title: title },
      // Passing in actual GraphQL query here `{fetchStuff: { title`}}
      //  but import query duh instead of hard coded like a silly
      refetchQueries: [{ query: queryFetchSongs }]
    })
    .then(({ data }) => {
      this.setState({ 
        success: true,
        title: '',
        mutationOccuring: false
      })

      this.props.history.push('/')
    })
    .catch((error) => {
      this.setState({ mutationOccuring: false })
      console.log('there was an error sending the query', error);
    });
  }

  render() {
    const songSubmitted = (<div>Song Submitted!!</div>)

    return(
      <div>
        <h3>Add a new song!</h3>
        <Form onSubmit={ this.handleSubmit }>
          <Input
            loading={ this.state.mutationOccuring }
            icon={{
              name: 'add',
              circular: true, 
              link: true, 
              onClick: this.handleSubmit 
            }}
            value={ this.state.title }
            placeholder='Title...'
            onChange={ this.handleChange }
            
          />
        </Form>

        { this.state.success ? songSubmitted : null }
      </div>
    )
  }
} 

export default graphql(queryAddSong)(SongCreate);