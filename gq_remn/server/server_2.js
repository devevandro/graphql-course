const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const User = require('./models/user.js');
const app = express();

const typeDefs = gql`
        type Query {
            user(id:ID!): User!
        }

        type Mutation{
            addUser( userInput:UserInput!):User!
        }

        type User {
            _id: ID!
            email: String!
            password: String!
        }

        input UserInput {
            email: String!
            password: String!
        }
`;

const resolvers = {
    Query: {
        user: async ( parent, args, context, info ) => {
            try {
                const user = await User.findOne({_id: args.id});
                return {
                    ...user._doc
                }
            } catch (error) {
                console.log(error);
            }
        },
    },

    Mutation: {
        addUser:async( parent, args, context, info ) => {
            try {
                const user = new User({
                    email: args.userInput.email,
                    password: args.userInput.password
                });
                const result = await user.save();

                return {
                    ...result._doc
                }
            } catch(error){
                console.log('error: ', error);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 6500;

mongoose.connect(``, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Running running on port ${PORT}`)
    });
}).catch(err => {
    console.log(err)
});
