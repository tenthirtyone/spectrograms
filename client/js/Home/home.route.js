(function () {
  'use strict';
  angular.module('App.home')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          url: '/',
          templateUrl: 'views/home.template.html',
          controller: 'HomeController',
          controllerAs: 'home',
          navItem: {
            displayName: 'Home',
            sref: 'home',
          },
        },
      },
    ];
  }
}());
