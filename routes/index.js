var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Realtime Dashboard' });
});

module.exports = router;
