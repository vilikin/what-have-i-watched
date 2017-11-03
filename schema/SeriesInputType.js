const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: "SeriesInputType",
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        currentEpisode: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        currentSeason: {
            type: GraphQLInt
        }
    }
});