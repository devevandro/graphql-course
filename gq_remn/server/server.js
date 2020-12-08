const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const User = require('./models/user.js');

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

const PORT = process.env.PORT || 6500;

mongoose.connect(`mongodb+srv://graphql-test:Yalhaw26@cluster0.mmehh.mongodb.net/graphql?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    server.listen(PORT, () => {
        console.log(`Running running on port ${PORT}`)
    });
}).catch(err => {
    console.log(err)
});
