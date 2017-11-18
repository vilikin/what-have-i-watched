const express = require('express');
const graphqlHTTP = require('express-graphql');
const Schema = require('./schema/Schema');

const app = express();

require('./data/db');

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

const port = 8080;

app.listen(port, () => {
    console.log("Server started at port " + port);
});