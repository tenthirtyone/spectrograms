(function() {
  'use strict';

  angular.module('App', [
    'App.directives',
    'App.home',
    'ngStorage',
    'ui.router'
  ]);

}());

(function () {
'use strict';

angular.module('App.home', []);

}());

(function () {
'use strict';

angular.module('App.directives', []);

}());

(function () {
  'use strict';

  angular.module('App.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['HomeService', '$scope', 'routerHelper'];

  function HomeController(HomeService, $scope, routerHelper) {
    var vm = this;
    var draws = 0;
    var xPosition = 0;
    var canvasOut = document.getElementById('Spectrum');
    var ctxOut = canvasOut.getContext('2d');
    vm.drawStyles = [
      'DarkVibrant',
      'DarkMuted',
      'Vibrant',
      'Muted',
      'LightVibrant',
      'LightMuted'
    ];
    vm.drawStyle = 'Vibrant';
    vm.changeStyle = changeStyle;
    vm.drawRate = 30;
    vm.clearCanvas = clearCanvas;

    init();

    function init() {
      console.log('init');

      var video = document.getElementById('VideoPlayer');
      var canvas = document.getElementById('CanvasPlayer');
      var context = canvas.getContext('2d');

      var cw = Math.floor(canvas.clientWidth);
      var ch = Math.floor(canvas.clientHeight);
      canvas.width = cw;
      canvas.height = ch;

      video.addEventListener('play', function(){
        console.log('play');
          draw(this,context,cw,ch);
      },false);

      video.addEventListener('loadedmetadata', function() {
        console.log(video.duration);
      });

    }

    function draw(video,ctx,w,h) {
        if(video.paused || video.ended) return false;
        ctx.drawImage(video,0,0,w,h);
        //console.log(c.canvas.toDataURL("image/jpeg"));

        //document.body.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
        updateSpectrum(draws, ctx)

        draws++;
        setTimeout(draw,20,video,ctx,w,h);
    }

    function updateSpectrum(draws, ctx) {
      if (draws % vm.drawRate === 0) {
        var img = document.createElement("IMG");
        img.setAttribute('src', ctx.canvas.toDataURL("image/jpeg"))
        img.addEventListener('load', function() {
          var vibrant = new Vibrant(img);
          vibrant.getPalette((err, palette) => {
            var rgb = palette[vm.drawStyle].rgb;
            console.log(vm.drawStyle);
            ctxOut.beginPath();
            ctxOut.moveTo(xPosition,0);
            ctxOut.lineTo(xPosition,200);
            ctxOut.lineWidth = 1;
            ctxOut.strokeStyle = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
            ctxOut.stroke();
            xPosition++;
          })
      });
      }
    }

    function clearCanvas() {
      ctxOut.clearRect(0, 0, canvasOut.width, canvasOut.height);
      draws = 0;
      xPosition = 0;
    }

    function changeStyle(style) {
      console.log('style')
      console.log(style)
      vm.drawStyle = style;
    }




    return vm;
  }
}());

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

(function () {
  'use strict';

  // Response Headers
  angular.module('App')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
  },
]);

}());

(function () {
  // Modified version of John Papa's Router Helper
  // https://github.com/johnpapa/angular-styleguide

  angular
    .module('App')
    .provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

    this.$get = RouterHelper;

    $locationProvider.html5Mode(false);

    RouterHelper.$inject = ['$state'];

    function RouterHelper($state) {
      var service = {
        configureStates: configureStates,
        getStates: getStates,
      };

      return service;

      function configureStates(states, otherwisePath) {
        states.forEach(function (state) {
          $stateProvider.state(state.state, state.config);
        });

        $urlRouterProvider.otherwise('/');
      }

      function getStates() { return $state.get(); }
    }
  }
}());

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
