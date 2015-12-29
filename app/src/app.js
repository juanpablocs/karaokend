var app = angular
        .module('starterApp', ['ngMaterial', 'ngRoute'])
        .config(['$mdThemingProvider','$routeProvider',function($mdThemingProvider, $routeProvider) {
	 $mdThemingProvider.theme('default').dark();
	 $routeProvider
	    .when('/', {
		templateUrl: 'index.html',
		controller: 'HomeController'
	    })
	    .when('/login', {
		templateUrl: 'login.html',
		controller: 'LoginController'
	    })
	    .otherwise({
		redirectTo: '/'
         });
}]);
