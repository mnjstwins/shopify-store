(function () {

  'use strict';

  var app = angular.module('shop-app');

  app.service('ProductService', ['$http', function ($http) {

    return {
      createProduct: function () {
          return {
            title: '',
            description: '',
            image: '',
            vendor: '',
            product_type: ''
          };
      },

      getProductList: function () {

        var promise = $http({
          method: 'GET',
          url: '/shopify/get?path=/admin/products.json'
        });

        return promise;
      },

      getProduct: function (productId) {

        var promise = $http({
          method: 'GET',
          url: '/shopify/get?path=/admin/products/' + productId + '.json'
        });

        return promise;
      },

      addProduct: function (product) {

        var promise = $http({
          method: 'POST',
          url: '/shopify/post?path=/admin/products.json',
          data: { product: product }
        });

        return promise;
      },

      editProduct: function (product) {
        var promise = $http({
          method: 'PUT',
          url: '/shopify/put?path=/admin/products/' + product.id + '.json',
          data: { product: product }
        });

        return promise;
      },

      deleteProduct: function (productId) {
        var promise = $http({
          method: 'DELETE',
          url: '/shopify/delete?path=/admin/products/' + productId + '.json'
        });

        return promise;
      }
    };

  }]);

})();
