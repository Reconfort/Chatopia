const express = require('express');
require('dotenv').config();
const { createHandler } = require("graphql-http/lib/use/express")
const { ruruHTML } = require("ruru/server")
const schema = require('./schema/schema')

const port = process.env.PORT || 5000;

const root = {
    hello() {
      return "Hello world!"
    },
  }

const app = express();

app.all(
    "graphql",
    createHandler({
        schema,
        rootValue: root,
    })
)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({endpoint: "/graphql"}))
})

app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)