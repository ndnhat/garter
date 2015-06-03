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
      success: update,
      error: showError
    });
  }

  function update(data) {
    for (var i = 0; i < data.users.length; i++) {
      chart.series[i].addPoint([data.time, data.users[i]], true, true);
      $('#widget_' + i + ' h3').text(data.users[i]);
    }
    clearError();
  }

  function showError() {
    $('.alert').addClass('error').text('Failed to update').show();
  }

  function clearError() {
    $('.error').hide();
  }

  function initWidgets(series, container) {
    for (var i = 0; i < series.length; i++) {
      container.widget({index: i, series: series[i]});
    }
  }

  $(document).ready(function () {
    initWidgets(seriesData, $('.rtWidgets'));

    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    chart = $('#rtChart').highcharts(options);
  });
})(jQuery, chartSeries);
