/**
 * Created by AlanJui on 15/3/2.
 */
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

  // show the request body in the command line
  console.log(req.body);


  // return a json response to Angular
  res.json({
    'msg': 'success!'
  });

});

// Expose the module
module.exports = router;