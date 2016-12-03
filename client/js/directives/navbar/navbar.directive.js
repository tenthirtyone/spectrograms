(function () {
  'use strict';

  angular
    .module('App.directives')
    .directive('navbar', navbar);

  function navbar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/navbar.template.html',
      scope: {
          navbardata: '=',
        },
      controller: DirectiveController,
      controllerAs: 'navbar',
      bindToController: true,
    };

    return directive;
  }

  DirectiveController.$inject = ['$scope', 'routerHelper'];

  function DirectiveController(scope, routerHelper) {
    var vm = this;
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
  }

}());
