var debug = require('debug')('garter');
var google = require('googleapis');
var analytics = google.analytics('v3');

var INTERVAL = 60*1000;
var PERIOD = 24; // in hours
var lastPing;
var authClient;
var series;

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
  var query = {
    'auth': authClient,
    'ids': 'ga:' + series.id,
    'dimensions': 'rt:country, rt:city',
    'metrics': 'rt:activeUsers'
  };
  
  analytics.data.realtime.get(query, function (err, entries) {
    if (err) {
      debug(err);
    } else {
      series.data.shift();
      series.data.push(entries.totalResults);
    }
  });
}

function query(series) {
  lastPing = new Date();
  series.forEach(ping);
  setTimeout(query, INTERVAL, series);
}


function GAQuery(auth, profiles) {
  series = initSeries(profiles);
  authClient = auth;
  query(series);
}

GAQuery.prototype.latest = function() {
  var latest = {
    time: lastPing,
    users: []
  };
  for (var i = 0; i < series.length; i++) {
    var seriesData = series[i].data;
    latest.users.push(seriesData[seriesData.length - 1]);
  }
  return latest;
};

GAQuery.prototype.history = function() {
  var startTime = new Date().setHours(new Date().getHours() - PERIOD);
  for (var i = 0; i < series.length; i++) {
    series[i].pointStart = startTime;
  }
  return series;
};

module.exports = GAQuery;
