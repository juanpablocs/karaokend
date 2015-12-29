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
      $mdThemingProvider.theme('default').dark();
      
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
