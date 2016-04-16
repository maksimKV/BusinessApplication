var app = angular.module('BusinessApplication');

app.controller('AppController', ['$scope', '$log', '$routeParams', '$location', 'RequestService',
	function ($scope, $log, $routeParams, $location, RequestService) {

	    $scope.employees;
	    $scope.partners;

	    $scope.employee;
	    $scope.partner;

	    $scope.option = "home";

	    $scope.init = function () {
            // Adding the employees
	        RequestService.AllEmployees().then(function (data) {
	            $scope.employees = data;
	        });

	        // Adding the partners
	        RequestService.AllPartners().then(function (data) {
	            $scope.partners = data;
	        });
	    }

	    $scope.$watch('employees', function () {
	        console.log($scope.employees);
	    });

	    $scope.$watch('employee', function () {
	        console.log($scope.employee);
	    });

	    $scope.$watch('routeParams', function () {
	        if(typeof $routeParams.employeeID !== 'undefined')
	        {
	            RequestService.SingleEmployee($routeParams.employeeID).then(function (data) {
	                $scope.employee = data;
	            });
	        }
	        else if (typeof $routeParams.partnerID !== 'undefined')
	        {
	            console.log($routeParams.partnerID);
	        }
	    });


	    
}]);