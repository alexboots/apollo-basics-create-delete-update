import gql from 'graphql-tag';

export default gql`
  mutation likeLyric($id: ID!) {
    likeLyric(id:$id) {
      id
      content
      likes
    }
  }
`;
