(function () {
  //Monitor response headers for a jwt. Automatically
  //saves any auth tokens to local storage. No good inside iframe.
  //Not used for Shopify
  'use strict';

  angular.module('App')
    .factory('tokenInterceptor', tokenInterceptor);

  tokenInterceptor.$inject = ['$localStorage'];

  function tokenInterceptor($localStorage) {
    return {
        request: function (config) {
            if (!config.headers.Authorization) {
              config.headers.Authorization = $localStorage.token || 'no token in local storage';
            }

            return config;
          },

        response: function (response) {
          if (response.headers('Authorization')) {
            $localStorage.token = response.headers('Authorization');
          }

          return response;
        },
      };
  }

  angular.module('App')
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('tokenInterceptor');
    },
  ]);
}());
