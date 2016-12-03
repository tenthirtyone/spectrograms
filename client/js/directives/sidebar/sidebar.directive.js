(function () {
  'use strict';

  angular
    .module('App.directives')
    .directive('sidebar', sidebar);

  function sidebar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/sidebar.template.html',
      scope: {
          sidebardata: '=',
        },
      controller: DirectiveController,
      controllerAs: 'vm',
      bindToController: true,
    };

    return directive;
  }

  function DirectiveController() {
    var vm = this;

  }

}());
