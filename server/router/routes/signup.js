/**
 * Created by AlanJui on 15/3/2.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

router.post('/', function (req, res) {

  // show the request body in the command line
  console.log(req.body);

  // The posted information from the front-end
  var body = req.body;

  // Current time this occurred
  var time = moment().format('MMMM Do YYYY, hh:mm:ss a');

  // Check to see if the user already exists
  // using their email address
  Users.findOne({
    'email': body.email
  }, function (err, user) {

    // If there's an error, log it and return to user
    if (err) {
      // message for knowing what happened
      console.log("Couldn't create new user at " + color.red(time)
        + ' by ' + color.red(body.email)
        + ' because of: ' + err);

      // send the error
      res.status(500).json({
        'message': 'Internal server error from signing up new user. please contact Web Master'
      });
    }

    // If the user doesn't exist, create one
    if (!user) {
      console.log('Create a new user at ' + color.green(time)
        + ' with the email: ' + color.green(body.email));

      // setup the new user
      var newUser = new Users({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password1
      });

      // save the user to the database
      newUser.save(function (err, saveUser, numberAffected) {
        if (err) {
          console.log('Problem saving the usder ' + color.yellow(body.email)
            + ' due to ' + err);
          res.status(201).json({
            'message': 'Successfully created new user',
            'client': _.omit(saveUser, 'password')
          })
        }
      })
    }

    // if the user already exists...
    if (user) {
      res.status(409).json({
        'message': body.email + ' already exists!'
      })
    }
  })
});

// export the router for usage in our server/router/index.js
module.exports = router;