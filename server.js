const express = require('express');
const graphqlHTTP = require('express-graphql');
const Schema = require('./schema/Schema');

const Sequelize = require('sequelize');

const db = 'dbc4vkinnu1';
const user = 'c4vkinnu';
const pass = 'Salasana123';

const sequelize = new Sequelize(db, user, pass, {
    host: 'mydb.tamk.fi',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const app = express();

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

const port = 8080;

app.listen(port, () => {
    console.log("Server started at port " + port);
});