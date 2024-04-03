var { buildSchema } = require("graphql")


export var schema = buildSchema(`
  type Query {
    hello: String
  }
`)