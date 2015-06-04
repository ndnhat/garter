/* global jQuery */
(function ($) {
  'use strict';

  $.fn.widget = function (params) {
    var index = params.index;
    var elem = $('<div>').attr('id', 'widget_' + index)
      .append($('<h2>').text(params.series.name))
      .append($('<h3>').text(params.series.data[params.series.data.length - 1]))
      .append($('<div>').attr('id', 'location_' + index));

    this.append(elem);
    
    var digit = $('#widget_' + index + ' h3');
    var chart = $('#location_' + index).highcharts({
      chart: {
        height: 250
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            color: 'white',
            distance: -50,
            formatter: function() {
              return this.percentage > 15 ? this.key : null;
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Users',
        data: params.series.locations
      }]
    }).highcharts();

    $(document).on('update/series', function (event, series) {
      digit.text(series.users[index]);
      chart.series[0].setData(series.locations[index]);
    });

  };

}(jQuery));