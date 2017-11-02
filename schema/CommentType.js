const {
    GraphQLString,
    GraphQLObjectType
} = require("graphql");

module.exports = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        user: {
            type: GraphQLString,
            resolve: (root) => root.user
        },
        text: {
            type: GraphQLString,
            resolve: (root) => root.text
        }
    })
});