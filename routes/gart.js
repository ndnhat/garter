var express = require('express');
var router = express.Router();
var GA = require('googleanalytics');

router.get('/', function(req, res) {
  var config = {
    user: process.env.GA_USER,
    password: process.env.GA_PASSWORD
  };
  var ga = new GA.GA(config);

  ga.login(function(err, token) {

    var options = {
      ids: 'ga:' + req.query.profile,
      metrics: 'rt:activeUsers'
    };

    ga.get(options, function(err, entries) {
      if (err) {
        res.send(500);
      } else {
        var num = 0;
        if (entries.length && entries[0].metrics.length) {
          num = entries[0].metrics[0][options.metrics];
        }

        res.json({users: num});
      }
    });

  });

});

module.exports = router;
