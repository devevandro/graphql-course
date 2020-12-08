const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://graphql-test:Yalhaw26@cluster0.mmehh.mongodb.net/graphql?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('🚀 Mongo ready'))
.catch(err => console.log('Mongo error', err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
