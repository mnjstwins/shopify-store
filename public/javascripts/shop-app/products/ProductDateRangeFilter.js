(function () {

  'use strict';

  var app = angular.module('shop-app');

  app.filter('dateRange', [function () {

    return function (products, startDate, endDate) {
      var result = [];

      // date filters
      var startDate = (startDate && !isNaN(Date.parse(startDate))) ? Date.parse(startDate) : 0;
      var endDate = (endDate && !isNaN(Date.parse(endDate))) ? Date.parse(endDate) : new Date().getTime();

      // if the products are loaded
      if (products && products.length > 0) {
        $.each(products, function (index, product) {
          var productDate = new Date(product.created_at);

          if (productDate >= startDate && productDate <= endDate) {
            result.push(product);
          }
        });

        return result;
      }

    };
    
  }]);

})();
