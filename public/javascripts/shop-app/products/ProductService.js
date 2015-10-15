(function () {

  'use strict';

  var app = angular.module('shop-app');

  app.service('ProductService', ['$http', '$q', '$cacheFactory', function ($http, $q, $cacheFactory) {

    var _productListCache = $cacheFactory('productList');

    var findProductById = function (productId, products) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
          return products[i];
        }
      }
    };

    var findProductIndexById = function (productId, products) {
        for (var i = 0; i < products.length; i++) {
          if (products[i].id == productId) {
            return i;
          }
        }
    };

    return {
      // creates an empty product
      createProduct: function () {
          return {
            title: '',
            body_html: '',
            image: '',
            vendor: '',
            product_type: '',
            variants: {
              barcode: '',
              sku: '',
              price: '',
              compare_at_price: '',
              weight: ''
            }
          };
      },

      // retrieves the shopify product list
      getProductList: function () {

        var deferred = $q.defer();

        if (_productListCache.get('productList')) {
          deferred.resolve(_productListCache.get('productList'));
        } else {
          $http.get('/shopify/get?path=/admin/products.json')
          .success(function (data) {
            _productListCache.put('productList', data);
            deferred.resolve(_productListCache.get('productList'));
          });
        }

        return deferred.promise;
      },

      // retrieves the shopify product
      getProduct: function (productId) {

        var deferred = $q.defer();

        var list = _productListCache.get('productList');
        if (list) {
          var product = findProductById(productId, list.products);
          deferred.resolve({ product: product });
        } else {
          $http.get('/shopify/get?path=/admin/products/' + productId + '.json')
          .success(function (data) {
            deferred.resolve(data);
          });
        }

        return deferred.promise;

      },

      // adds product to shoppify product list
      addProduct: function (product) {
        var deferred = $q.defer();

        $http.post('/shopify/post?path=/admin/products.json', { product: product })
        .success(function (data) {
          var list = _productListCache.get('productList');
          if (list) {
            list.products.push(data.product);
            _productListCache.put('productList', list);
          }

          deferred.resolve(data);
        });

        return deferred.promise;

      },

      // edits shoppify product
      editProduct: function (product) {

        var deferred = $q.defer();

        $http.put('/shopify/put?path=/admin/products/' + product.id + '.json', { product: product })
        .success(function (data) {
          var list = _productListCache.get('productList');
          if (list) {
            var productIndex = findProductIndexById(product.id, list.products);
            list.products[productIndex] = data.product;
            _productListCache.put('productList', list);
          }
          deferred.resolve(data);
        });

        return deferred.promise;

      },

      // deletes shopify product
      deleteProduct: function (productId) {
        var deferred = $q.defer();

        $http.delete('/shopify/delete?path=/admin/products/' + productId + '.json')
        .success(function (data) {
          var list = _productListCache.get('productList');
          if (list) {
            var productIndex = findProductIndexById(productId, list.products);
            list.products.splice(productIndex, 1);
            _productListCache.put('productList', list);
          }
          deferred.resolve(data);
        });

        return deferred.promise;

      }
    };

  }]);

})();
