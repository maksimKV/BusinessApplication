﻿var app = angular.module('BusinessApplication');

app.controller('AppController', ['$scope', '$log', 'RequestService',
	function ($scope, $log, RequestService) {

	    $scope.employees;
	    $scope.partners;

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
}]);