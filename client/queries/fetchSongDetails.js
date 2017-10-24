import gql from 'graphql-tag';

export default gql`
query GetSong($id: ID!){
  song(id: $id) {
    title
  }
}
`