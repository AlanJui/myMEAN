/**
 * Database Interface
 * Created by AlanJui on 15/3/3.
 */

var mongoose = require('mongoose');
var UserModel = require('./schemas/users');

// Connections
var developmentDb = 'mongodb://localhost/text';
var productionDb = 'urlToYourProductionMongoDb';
var usedDb;

// If we're in development...
if (process.env.NODE_ENV === 'development') {
  // set database to the development one
  usedDb = developmentDb;
  // connect to it vir mongoose
  mongoose.connect(usedDb);
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
  // set database to the production one
  usedDb = productionDb;
  // connect to it vir mongoose
  mongoose.connect(usedDb);
}

// get an instance of our connection to our database
var db = mongoose.connection;

// Logs that the connection has successfully been opened
db.on('error', console.error.bind(console, 'DB connection error:'));

// Open the connection
db.once('open', function callback() {
  console.log('MongoDB Connection Successfully Opened at ' + usedDb);
});

exports.users = UserModel;