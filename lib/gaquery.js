var debug = require('debug')('ga-api');
var GA = require('googleanalytics');
var INTERVAL = 60*1000;
var PERIOD = 24; // in hours
var lastPing;
var ga;

function initSeries(profiles) {
  var series = [];
  var data;
  for (var p = 0; p < profiles.length; p++) {
    data = {
      id: profiles[p].id,
      name: profiles[p].name,
      data: [],
      pointInterval: INTERVAL
    };
    for (var i = -PERIOD*60; i <= 0; i++) {
      data.data.push(0);
    }
    series.push(data);
  }
  return series;
}

function ping(series) {
  var options = {
    ids: 'ga:' + series.id,
    metrics: 'rt:activeUsers'
  };

  ga.get(options, function(err, entries) {
    if (err) {
      debug(err);
    } else {
      var result = 0;
      if (entries.length && entries[0].metrics.length) {
        result = entries[0].metrics[0][options.metrics];
      }
      series.data.shift();
      series.data.push(result);
    }
  });
}

function query(series) {
  lastPing = new Date();
  series.forEach(ping);
  setTimeout(query, INTERVAL, series);
}


function GAQuery(config) {
  ga = new GA.GA(config.credentials);
  this.series = initSeries(config.profiles);
  this.start();
}

GAQuery.prototype.latest = function() {
  var latest = {
    time: lastPing,
    users: []
  };
  for (var i = 0; i < this.series.length; i++) {
    var seriesData = this.series[i].data;
    latest.users.push(seriesData[seriesData.length - 1]);
  }
  return latest;
};

GAQuery.prototype.history = function() {
  var startTime = new Date().setHours(new Date().getHours() - PERIOD);
  for (var i = 0; i < this.series.length; i++) {
    this.series[i].pointStart = startTime;
  }
  return this.series;
};

GAQuery.prototype.start = function() {
  var series = this.series;
  ga.login(function(err, token) {
    if (err) {
      debug(err);
    } else {
      query(series);
    }
  });
};

module.exports = GAQuery;
