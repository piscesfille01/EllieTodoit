// graphql/subscriptions.js

import gql from "graphql-tag";

export const onCreateTodo = gql`
  subscription OnCreateTodo {
    onCreateTodo {
      id
      title
      date
      done
    }
  }
`;
