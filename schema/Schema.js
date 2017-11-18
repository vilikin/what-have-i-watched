const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const { Series, Comment } = require("../data/db");

const SeriesType = require('./SeriesType');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            series: {
                type: new GraphQLList(SeriesType),
                resolve: () => Series.findAll({ include: [ Comment ] })
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutations',
        description: 'These are the things we can change',
        fields: () => ({
            addSeries: {
                type: new GraphQLNonNull(SeriesType),
                description: 'Add a new series and return it.',
                args: {
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
                },
                resolve: (value, series) => Series.create(series)
            }
        })
    })
});