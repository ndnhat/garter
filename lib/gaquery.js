var debug = require('debug')('garter');
var envs = require('envs');
var google = require('googleapis');
var analytics = google.analytics('v3');

var INTERVAL = envs('UPDATE_INTERVAL') || 60*1000;
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
    'dimensions': 'rt:region',
    'metrics': 'rt:activeUsers'
  };
  
  analytics.data.realtime.get(query, function (err, entries) {
    if (err) {
      debug(err);
    } else {
      series.data.shift();
      series.data.push(parseInt(entries.totalsForAllResults['rt:activeUsers'], 10));
      series.locations = transform(entries.rows);
    }
  });
}

function query(series) {
  lastPing = new Date();
  series.forEach(ping);
  setTimeout(query, INTERVAL, series);
}

function transform(locations) {
  return locations.map(function (item) {
    item[1] = parseInt(item[1], 10);
    return item;
  });
}

function GAQuery(auth, profiles) {
  series = initSeries(profiles);
  authClient = auth;
  query(series);
}

GAQuery.prototype.latest = function() {
  var latest = {
    time: lastPing,
    users: [],
    locations: []
  };
  
  for (var i = 0; i < series.length; i++) {
    var seriesData = series[i].data;
    latest.users.push(seriesData[seriesData.length - 1]);
    latest.locations.push(series[i].locations);
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
