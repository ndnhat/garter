(function ($, seriesData) {
  var INTERVAL = 60*1000;
  var chart;

  var options = {
    chart: {
      animation: Highcharts.svg,
      events: {
        load: getGart
      }
    },
    title: {
      text: 'Active Visitors'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Users'
      },
      min: 0,
      minTickInterval: 50,
      allowDecimals: false
    },
    plotOptions: {
      line: {
        lineWidth: 2,
        marker: {
          enabled: false
        }
      },
      series: {
        marker: {
          enabled: false
        }
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: seriesData
  };

  function getGart() {
    setInterval(function () {
      updateSeries();
    }, INTERVAL);
  }

  function updateSeries() {
    $.ajax({
      url: '/gart',
      dataType: 'json',
      success: function (data) {
        for (var i = 0; i < data.users.length; i++) {
          chart.series[i].addPoint([data.time, data.users[i]], true, true);
          $('#counter_' + i + ' h3').text(data.users[i]);
        }
      }
    });
  }

  function initCounters(series, container) {
    for (var i = 0; i < series.length; i++) {
      var elem = $('<div>').attr('id', 'counter_' + i)
        .append($('<h2>').text(series[i].name))
        .append($('<h3>').text(series[i].data[series[i].data.length - 1]));
      container.append(elem);
    }
  }

  $(document).ready(function () {
    initCounters(seriesData, $('.rtCounters'));

    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    chart = $('#rtChart').highcharts(options).highcharts();
  });
})(jQuery, chartSeries);
