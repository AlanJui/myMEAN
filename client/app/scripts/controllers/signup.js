'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SignupCtrl', function ($scope, $http) {

    var user, signup;
    $scope.signup = signup = {};
    signup.user = user = {};

    signup.submit = function () {

      // Make sure all fields are filled out
      if (
          !user.firstname ||
          !user.lastname ||
          !user.email ||
          !user.password1 ||
          !user.password2
      ) {
        alert('Please fill out all form fields.');
        return false;
      }

      // Make sure the passwords match
      if (user.password1 !== user.password2) {
        alert('Your passwords must match.');
        return false;
      }

      // Just for confirm that the bindings are working
      console.log(user);

      // Make the request to the server
      var request = $http.post('/signup', user);

      request.success(function (data) {
        console.log(data);
      });

      request.error(function (data) {
        console.log(data);
      });
    };

  });
