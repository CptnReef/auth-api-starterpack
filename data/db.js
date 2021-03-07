// TODO: Set up your Mongoose connection here.
const mongoose = require('mongoose');
assert = require("assert");

// connect to mongo db
const mongoUri = process.env.MONGODB_URI
const url = `mongodb://localhost/${mongoUri}`;

mongoose.Promise = global.Promise;
mongoose.connect(
    url,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    function(err, db) {
        assert.equal(null, err);
        console.log(`Connected successfully to database`);
        db.close(); //turn on for testing
    }
);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection