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
            
            // route for the single employee page
            .when('/emloyee/view/:employeeID', {
                templateUrl: 'App/Pages/Employee.html',
                controller: 'AppController'
            })

            // route for the adding of employees page
            .when('/employee/add', {
                templateUrl: 'App/Pages/AddEmployee.html',
                controller: 'AppController'
            })

            // route for the removing of employees page
            .when('/employee/remove/:employeeName', {
                templateUrl: 'App/Pages/RemoveEmployee.html',
                controller: 'AppController'
            })

            // route for the updating of employees page
            .when('/employee/update/:employeeID', {
                templateUrl: 'App/Pages/UpdateEmployee.html',
                controller: 'AppController'
            })

            // route for successful employee update page
            .when('/employee/updated/:employeeName', {
                templateUrl: 'App/Pages/EmployeeUpdated.html',
                controller: 'AppController'
            })

            // route for the partners page
            .when('/partners', {
                templateUrl: 'App/Pages/Partners.html',
                controller: 'AppController'
            })

            // route for the single partner page
            .when('/partner/view/:partnerID', {
                templateUrl: 'App/Pages/Partner.html',
                controller: 'AppController'
            })

            // route for the adding of partners page
            .when('/partner/add', {
                templateUrl: 'App/Pages/AddPartner.html',
                controller: 'AppController'
            })

            // route for the removing of partners page
            .when('/partner/remove/:partnerName', {
                templateUrl: 'App/Pages/RemovePartner.html',
                controller: 'AppController'
            })

            // route for the updating of partners page
            .when('/partner/update/:partnerID', {
                templateUrl: 'App/Pages/UpdatePartner.html',
                controller: 'AppController'
            })

            // route for successful partner update page
            .when('/partner/updated/:partnerName', {
                templateUrl: 'App/Pages/PartnerUpdated.html',
                controller: 'AppController'
            })

            // route for errors page
            .when('/error', {
                templateUrl: 'App/Pages/Error.html',
                controller: 'AppController'
            })

            // default route
            .otherwise({redirectTo: '/home'});
    });
	
}());