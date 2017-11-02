const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const SeriesType = require('./SeriesType');

const mockdata = require('../data/mockdata');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            series: {
                type: new GraphQLList(SeriesType),
                resolve: () => mockdata.series
            }
        }
    })
});