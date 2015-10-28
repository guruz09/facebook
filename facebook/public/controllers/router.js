
/**
 * New node file
 */

var MyApp = angular.module('MyApp',['ngRoute']);

MyApp.config(['$locationProvider', '$routeProvider', function($locationProvider,$routeProvider) {
	   $locationProvider.html5Mode({
		   enabled: true,
		    requireBase: false
		    });
	  $routeProvider
	  .when('/', {
		    templateUrl: 'loginTemplate',
		    controller: 'loginCtrl'
		  });
}]);
