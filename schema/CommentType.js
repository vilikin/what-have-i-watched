const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull
} = require("graphql");

module.exports = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: (root) => root.id
        },
        user: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (root) => root.user
        },
        text: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (root) => root.text
        }
    })
});