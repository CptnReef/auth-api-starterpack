// TODO: Set up your Mongoose connection here.
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../server');
assert = require("assert");

// connect to mongo db

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.DATABASE_URL,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    function(err, db) {
        assert.equal(null, err);
        console.log(`Connected successfully to database`);
        // db.close(); //turn on for testing
    }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection Error:"));
db.once("open", () => console.log('Connected to Database'));

mongoose.set("debug", true);

module.exports = mongoose.connection