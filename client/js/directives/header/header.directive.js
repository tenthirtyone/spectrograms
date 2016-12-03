(function () {
  'use strict';

  angular
    .module('App.directives')
    .directive('header', header);

  function header() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/header.template.html',
      scope: {
          headerdata: '=',
        },
      controller: DirectiveController,
      controllerAs: 'header',
      bindToController: true,
    };

    return directive;
  }

  DirectiveController.$inject = ['$scope', 'routerHelper'];

  function DirectiveController(scope, routerHelper) {
    var vm = this;
    vm.brand = 'App';
    vm.navItems = getNavItems();

    init();

    function init() {
      getNavItems();
    }

    function getNavItems() {
      var states = routerHelper.getStates();
      var navItems = [];
      angular.forEach(states, function (state, key) {
        if (state.navItem) {
          navItems.push(state.navItem);
        }
      });

      return navItems;
    }

    return vm;
  }

}());
