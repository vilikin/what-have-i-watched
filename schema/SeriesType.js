const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList
} = require("graphql");

const CommentType = require('./CommentType');

module.exports = new GraphQLObjectType({
    name: 'SeriesType',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: (root) => root.id
        },
        name: {
            type: GraphQLString,
            resolve: (root) => root.name
        },
        description: {
            type: GraphQLString,
            resolve: (root) => root.description
        },
        currentEpisode: {
            type: GraphQLInt,
            resolve: (root) => root.currentEpisode
        },
        currentSeason: {
            type: GraphQLInt,
            resolve: (root) => root.currentSeason
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: (root) => {

            }
        }
    })
});