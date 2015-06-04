/* global INTERVAL */
/* global Highcharts */
/* global chartSeries */
(function ($, seriesData) {
  'use strict';
  
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
    $(document).trigger('update/series', data);
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

  function initErrorChart() {
    var container = $('.errorChart')
    var chart = container.find('img');
    updateErrorChart(chart, container.width());
  }

  function updateErrorChart(chart, width) {
    var SECS_IN_DAY = 24*60*60*1000;
    var time = new Date().getTime() - 30*SECS_IN_DAY;

    var chartSrc = 'http://tsd.octanner.com/q?start=' + time + '&ignore=2&m=sum:tomcat2.exceptions%7Boctcoreenv=tmile-app-prod%7D&o=&yrange=%5B0:%5D&wxh=' + width + 'x400&png'
    chart.attr('src', chartSrc);
    setTimeout(updateErrorChart, SECS_IN_DAY, chart, width);
  }
  
  $(document).ready(function () {
    initWidgets(seriesData, $('.rtWidgets'));
    initErrorChart();

    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
  
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


    var chart = $('#rtChart').highcharts(options).highcharts();
    $(document).on('update/series', function (event, data) {
      for (var i = 0; i < data.users.length; i++) {
        chart.series[i].addPoint([data.time, data.users[i]], true, true);
      }
    });
    
  });
})(jQuery, chartSeries);
