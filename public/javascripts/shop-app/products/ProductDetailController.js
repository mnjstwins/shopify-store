(function () {

  'use strict';

  var app = angular.module('shop-app');

  app.controller('ProductDetailController', ['$scope', '$stateParams', '$state', '$sce', 'ProductService', function ($scope, $stateParams, $state, $sce, ProductService) {

    var productId = $stateParams.productId;
    $scope.product = {};

    //grab product detail from ProductService
    ProductService.getProduct(productId).then(
      function (data) {
        var product = data;
        $scope.product = product.product;
        $scope.body = $sce.trustAsHtml($scope.product.body_html);

      },
      function (response) {
        //alert("There was an error retrieving product details");
      });

      $scope.editProduct = function () {
        $state.go('products.edit', { productId: $scope.product.id });
      };

      $scope.deleteProduct = function () {
        ProductService.deleteProduct($scope.product.id).then(
          function (response) {
            $state.transitionTo('products', $stateParams, { reload: true });
          });
      };

  }]);

})();
