(function(){

    var app = angular.module('BusinessApplication', ['ngRoute']);

    // Configuring application routes
    app.config(function ($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl: 'App/Pages/Home.html',
                controller: 'AppController'
            })

            // route for the employees page
            .when('/employees', {
                templateUrl: 'App/Pages/Employees.html',
                controller: 'AppController'
            })

            // route for the partners page
            .when('/partners', {
                templateUrl: 'App/Pages/Partners.html',
                controller: 'AppController'
            })

            // default route
            .otherwise({redirectTo: '/home'});
    });
	
}());