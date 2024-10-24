var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/views/visitor/index.html');
});

router.get('/paycheck/:carnum', function(req, res, next) {
  res.sendFile(__dirname + '/views/visitor/paycheck.html');
});

/* admin */
router.get('/admin', function(req, res, next) {
  res.sendFile(__dirname + '/views/admin/index.html');
});

router.get('/admin/parking', function(req, res, next) {
  res.sendFile(__dirname + '/views/admin/parking.html');
});


module.exports = router;
