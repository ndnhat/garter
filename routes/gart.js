var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json(gaquery.latest());
});

module.exports = router;
