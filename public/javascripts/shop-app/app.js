(function () {

  'use strict';

  var app = angular.module('shop-app', ['ui.router']);

  app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
    .state('products', {
      url: '',
      controller: 'ProductListController',
      templateUrl: '/templates/products/product-list.html'
    })
    .state('products.add', {
      url: '/products/add',
      controller: 'ProductSaveController',
      templateUrl: '/templates/products/product-save.html',
      formType: function () { return 'add' }
    })
    .state('products.edit', {
      url: '/products/edit/:productId',
      controller: 'ProductSaveController',
      templateUrl: '/templates/products/product-save.html',
      formType: function () { return 'edit' }
    })
    .state('products.detail', {
      url: '/products/:productId',
      controller: 'ProductDetailController',
      templateUrl: '/templates/products/product-detail.html'
    });

  }]);

})();
