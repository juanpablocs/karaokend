var app = 
  angular
    .module('starterApp', ['ngMaterial', 'ngRoute', 'ngCookies', 'googleplus'])
    .config(['$mdThemingProvider','$routeProvider', 'GooglePlusProvider', function($mdThemingProvider, $routeProvider, GooglePlusProvider) {
      
      // google config (http://localhost:3000)
      GooglePlusProvider.init({
        clientId: '973635393523-aoi7qg5fo1atnvo8s7trhruf0a2b4mrl.apps.googleusercontent.com',
        apiKey: 'Kcu5fm644cIuiobLegEPENgd'
      });

      // material config
      $mdThemingProvider.definePalette('dart', {
          '50': 'ffffff',
          '100': '999999',
          '200': '777777',
          '300': '555555',
          '400': '333333',
          '500': '000000',
          '600': '000000',
          '700': '000000',
          '800': '000000',
          '900': '000000',
          'A100': 'DDDDDD',
          'A200': 'CCCCCC',
          'A400': 'BBBBBB',
          'A700': '000000',
          'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                              // on this palette should be dark or light
          'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
              '200', '300', '400', 'A100'],
          'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
      $mdThemingProvider
        .theme('default')
        .primaryPalette('light-green')
        .accentPalette('dart')
        .dark();
      
      // router config
      $routeProvider
        .when('/', {
          templateUrl: 'src/controllers/home/view/index.html',
          controller: 'HomeController'
        })
        .when('/login', {
          templateUrl: 'src/controllers/login/view/login.html',
          controller: 'LoginController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }])

    .run(['$rootScope', '$location', '$cookieStore', function($rootScope, $location, $cookieStore)
    {
      
      $rootScope.$on('$routeChangeStart', function (event, route) 
      {
        $rootScope.loading = true;

        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = ['/login', '/register'].indexOf(route.originalPath) === -1;
        var loggedIn = $cookieStore.get('loginStatus');
        
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }

        setTimeout(function(){
          $rootScope.user = $cookieStore.get('user');
          $rootScope.$apply(function() {
             $rootScope.loading=false;
          });
        },1000);

      });

    }]);
