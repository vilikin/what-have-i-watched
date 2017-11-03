const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const SeriesType = require('./SeriesType');
const SeriesInputType = require('./SeriesInputType');

const mockdata = require('../data/mockdata');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            series: {
                type: new GraphQLList(SeriesType),
                resolve: () => mockdata.series
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
                    series: { type: SeriesInputType }
                },
                resolve: (value, { series }) => {
                    mockdata.series.push(series);
                    return series;
                }
            }
        })
    })
});