const { ApolloServer } = require('apollo-server');
const Mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB,PORT } = require('./config');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

Mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB Connected!!');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    })
    .catch((err) => {
        console.error(err);
    });
