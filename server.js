const express = require('express');
const graphqlHTTP = require('express-graphql');
const Schema = require('./schema/Schema');

const app = express();

const SERVER_PORT = 8080;

require('./data/db');

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.listen(SERVER_PORT, () => {
    console.log("Server started at port " + SERVER_PORT);
});