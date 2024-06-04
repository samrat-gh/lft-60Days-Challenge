const express = require("express");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const bodyParser = require("body-parser");
const cors = require("cors");

const axios = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
     
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
    }

    type Todo {
        id: ID!
        title: String!
        completed: Boolean
        user : User
    }

    type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User
    }
    `,
    resolvers: {
      Todo: {
        user: async (todo) => {
          const obj = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.userId}`
          );

          return obj.data;
        },
      },
      Query: {
        getTodos: async () => {
          const res = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );
          return res.data;
        },

        getAllUsers: async () => {
          const res = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          return res.data;
        },

        getUser: async (parent, { id }) => {
          const user = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          return user.data;
        },
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("server started at port 8000"));
}

startServer();
