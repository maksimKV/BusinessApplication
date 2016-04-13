var app = angular.module('BusinessApplication');

app.controller('AppController', ['$scope', '$log', 'RequestService',
	function ($scope, $log, RequestService) {

	    $scope.employees;
	    $scope.partners;

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

	    $scope.StartGame = function (value) {
	        switch(true)
	        {
	            case (value == "home"):
	                $scope.option = "home";
	                break;
	            case (value == "employees"):
	                $scope.option = "employees";
	                break;
	            case (value == "partners"):
	                $scope.option = "partners";
	                break;
	            default:
	                $scope.option = "home";
	        }
	    }
}]);