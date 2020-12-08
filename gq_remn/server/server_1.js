const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;
const User = require('./models/user.js');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.get('/playground', expressPlayground({endpoint: '/graphql'}));

app.use(
    '/graphql',
    graphqlHTTP({
        schema:buildSchema(`
        type RootQuery {
            user(id:ID!): User!
        }

        type RootMutation{
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

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue:{
            user: async args => {
                try {
                    const user = await User.findOne({_id: args.id});
                    return {
                        ...user._doc
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            addUser:async args => {
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
        },
        graphiql: true
    })
);

const PORT = process.env.PORT || 6500;

mongoose.connect(``,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Running running on port ${PORT}`)
    });
}).catch( err => {
    console.log(err)
});
