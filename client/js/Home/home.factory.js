(function () {
  'use strict';

  angular.module('App.home')
  .factory('HomeService', HomeService);

  HomeService.$inject = ['$http', '$state', '$timeout'];

  function HomeService($http, $state, $timeout) {

    return {

    };

  }

}());
