var app = angular.module('BusinessApplication');

app.controller('AppController', ['$scope', '$log', '$routeParams', '$location', 'RequestService',
	function ($scope, $log, $routeParams, $location, RequestService) {

	    $scope.employees;
	    $scope.partners;

	    $scope.employee;
	    $scope.partner;

        // Required for the delete/ update and add templates
	    $scope.employeeName;
	    $scope.partnerName;

	    $scope.init = function () {
            // Adding the employees
	        GetEmployees();

	        // Adding the partners
	        GetPartners();
	    }

	    $scope.$watch('routeParams', function () {
	        if(typeof $routeParams.employeeID !== 'undefined')
	        {
	            RequestService.SingleEmployee($routeParams.employeeID).then(function (data) {
	                $scope.employee = data;
	            });
	        }
	        else if (typeof $routeParams.partnerID !== 'undefined')
	        {
	            RequestService.SinglePartner($routeParams.partnerID).then(function (data) {
	                $scope.partner = data;
	            });
	        }

	        if (typeof $routeParams.employeeName !== 'undefined') {
	            $scope.employeeName = $routeParams.employeeName;
	        } 
	        else if (typeof $routeParams.partnerName !== 'undefined') {
	            $scope.partnerName = $routeParams.partnerName;
	        }
	    });

	    $scope.$on('$routeChangeSuccess', function () {
	        GetEmployees();
	        GetPartners();
	    });

	    $scope.RemoveEmployee = function (employeeID) {
	        RequestService.RemoveEmployee(employeeID);
	    };

	    $scope.RemovePartner = function (partnerID) {
	        RequestService.RemovePartner(partnerID);
	    };

	    var GetEmployees = function () {
	        RequestService.AllEmployees().then(function (data) {
	            $scope.employees = data;
	        });
	    };

	    var GetPartners = function () {
	        RequestService.AllPartners().then(function (data) {
	            $scope.partners = data;
	        });
	    };

	    
}]);