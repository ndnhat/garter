/* global jQuery */
(function ($) {
  'use strict';

  $.fn.widget = function (params) {
    var elem = $('<div>').attr('id', 'widget_' + params.index)
      .append($('<h2>').text(params.series.name))
      .append($('<h3>').text(params.series.data[params.series.data.length - 1]));

    this.append(elem);
    
  };

}(jQuery));