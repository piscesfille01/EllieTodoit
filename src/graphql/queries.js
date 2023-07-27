// graphql/queries.js

import gql from "graphql-tag";

export const listTodos = gql`
  query ListTodos {
    listTodos {
      items {
        id
        title
        date
        done
      }
    }
  }
`;
