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
const CommentType = require('./CommentType');

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
            },
            modifySeries: {
                type: new GraphQLNonNull(SeriesType),
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    name: {
                        type: GraphQLString
                    },
                    description: {
                        type: GraphQLString
                    },
                    currentEpisode: {
                        type: GraphQLInt
                    },
                    currentSeason: {
                        type: GraphQLInt
                    }
                },
                resolve: async (value, args) => {
                    const series = await Series.findById(args.id);

                    if (!series) throw new Error("Couldn't find any series with id " + args.id);

                    delete args.id;

                    await series.update(args);

                    return series;
                }
            },
            removeSeries: {
                type: new GraphQLNonNull(SeriesType),
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: async (value, args) => {
                    const series = await Series.findById(args.id);

                    if (!series) throw new Error("Couldn't find any series with id " + args.id);

                    await series.destroy();

                    return series;
                }
            },
            addComment: {
                type: new GraphQLNonNull(CommentType),
                description: 'Add a new comment to a series and return it.',
                args: {
                    series: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    user: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async (value, args) => {
                    const series = await Series.findById(args.series);

                    if (!series) throw new Error("Couldn't find any series with id " + args.series);

                    const comment = await Comment.create({
                        user: args.user,
                        text: args.text
                    });

                    await series.addComment(comment);

                    return comment;
                }
            }
        })
    })
});