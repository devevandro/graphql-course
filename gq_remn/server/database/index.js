const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect(``, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('🚀 Mongo ready'))
.catch(err => console.log('Mongo error', err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
