// graphql/mutations.js

import gql from "graphql-tag";

export const createTodo = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      date
      done
    }
  }
`;
