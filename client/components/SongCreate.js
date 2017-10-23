import React, { Component } from 'react';

import { Form, Input, Label, Button } from 'semantic-ui-react'

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongCreate extends Component {
  
  handleChange = (e, data) => { 
    const { value } = data;

    value.length ? this.setState({ value }) : this.setState({ value: null });
  }

  handleSubmit = (e, data) => {
    e.preventDefault();

    const title = this.state.value; 
  
    this.props.mutate({
      variables: { title: title }
    }).then(({ data }) => {
        console.log('data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    console.log('this.state', this.state)
    return(
      <div>
        <h3> Add a new song! </h3>
        <Form onSubmit={ this.handleSubmit }>
          <Input
            icon={{
              name: 'add',
              circular: true, 
              link: true, 
              onClick: this.handleSubmit 
            }}
            placeholder='Title...'
            onChange={ this.handleChange }
            action={ true }
          />
        </Form>
      </div>
    )
  }
} 

const mutation = gql`
mutation addSong($title: String!) {
    addSong(title: $title) {
    title,
    id
  }
}
`;

export default graphql(mutation)(SongCreate);