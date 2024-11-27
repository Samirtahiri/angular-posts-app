import { gql } from 'apollo-angular';

export const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

export const GET_POST_QUERY = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        name
        email
      }
      comments {
        data {
          id
          name
          email
          body
        }
      }
    }
  }
`;


export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: ID!) {
  deletePost(id: $id)
}
`;

export const UPDATE_POST_MUTATION = gql`
mutation updatePost($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    id
    title
    body
  }
}
`;
