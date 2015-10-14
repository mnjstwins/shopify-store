(function () {

  'use strict';

  var app = angular.module('shop-app');

  app.controller('ProductListController', ['$scope', '$state', 'ProductService', function ($scope, $state, ProductService) {

    $scope.products = [];

    // grab products from ProductService
    ProductService.getProductList().then(
      function (response) {
        var products = response.data;
        $scope.products = products.products;
      },
      function (response) {
        //alert("There was an error retrieving products.");
      });

      $scope.addProduct = function () {
        // Load add product state
        $state.go('products.add');
      }

  }]);

})();
