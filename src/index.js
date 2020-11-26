import { GraphQLServer } from 'graphql-yoga';
import {Query, Mutation, Post, User, Pictures, Animal} from './graphql/resolvers/index.js';

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Post,
        User,
        Pictures,
        Animal
    }
});

server.start(() => {
    console.log('And running running');
});
