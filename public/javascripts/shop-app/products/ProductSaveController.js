(function () {

  'use strict';

  var app = angular.module('shop-app');

  app.controller('ProductSaveController', ['$scope', '$stateParams', '$state', '$sce', 'ProductService', function (
    $scope, $stateParams, $state, $sce,
    ProductService) {

    var product;
    if ($stateParams.productId) {
      // We are editing
      ProductService.getProduct($stateParams.productId).then(function (data) {
          product = data.product;
          $scope.product = $.extend({}, product); // copy existing product object
      });
    } else {
      // We are adding
      product = ProductService.createProduct();
      $scope.product = product;
    }

    // Add save method
    $scope.save = function () {

      var product = $scope.product;

      for (var property in product) {
        if (!product[property]) {
          // Remove attribute if empty property
          delete product[property];
        }
      }

      if ($stateParams.productId) {
        // editing
        ProductService.editProduct(product).then(function (response) {
          $state.transitionTo('products.edit', $stateParams, { reload: true });
        });
      } else {
        // adding
        ProductService.addProduct(product).then(function (response) {
          $state.transitionTo('products.add', $stateParams, { reload: true });
          console.log(response);
        });
      }

    };

  }]);

})();
