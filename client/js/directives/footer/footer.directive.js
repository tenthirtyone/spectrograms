(function() {
  'use strict';
  
  angular
    .module('App.directives')
    .directive('footer', footer);

  function footer() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/footer.template.html',
      scope: {
          footerdata: '='
      },
      controller: DirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function DirectiveController() {
    var vm = this;
    
  }
  
}());