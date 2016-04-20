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

	    $scope.UpdateEmployee = function () {

	    };

	    $scope.Check = function (ID, Relationships) {
	        var checked = false;

	        for (var i = 0; i < Relationships.length; i++) {
	            if (Relationships[i].ID == ID) {
	                checked = true;
	            }
	        }

	        return checked;
	    };

	    $scope.AddRemoveSubordinate = function (Object) {
	        for (var i = 0; i < $scope.employee.Subordinates.length; i++) {
	            if ($scope.employee.Subordinates[i].ID == Object.ID) {
	                $scope.employee.Subordinates.splice(i, 1);

	                return;
	            }
	        }

	        $scope.employee.Subordinates.push(Object);
	    };

	    $scope.AddRemoveSupervisor = function (Object) {
	        for (var i = 0; i < $scope.employee.Supervisor.length; i++) {
	            if ($scope.employee.Supervisor[i].ID == Object.ID) {
	                $scope.employee.Supervisor.splice(i, 1);

	                return;
	            }
	        }

	        $scope.employee.Supervisor.push(Object);
	    };

	    $scope.AddRemovePartnerFromEmployee = function (Object) {
	        for (var i = 0; i < $scope.employee.Partners.length; i++) {
	            if ($scope.employee.Partners[i].ID == Object.ID) {
	                $scope.employee.Partners.splice(i, 1);

	                return;
	            }
	        }

	        $scope.employee.Partners.push(Object);
	    }

	    $scope.AddRemoveEmployeeFromPartner = function (Object) {
	        for (var i = 0; i < $scope.partner.Partners.length; i++) {
	            if ($scope.partner.Partners[i].ID == Object.ID) {
	                $scope.partner.Partners.splice(i, 1);

	                return;
	            }
	        }

	        $scope.partner.Partners.push(Object);
	    }

	    $scope.UpdateEmployee = function () {
	        RequestService.UpdateEmployee($scope.employee);
	    }

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