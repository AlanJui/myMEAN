/**
 * The Index of Routes
 * @type {*|exports}
 */

module.exports = function (app) {

  // the signup route
  app.use('/signup', require('./routes/signup'));

};
