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

	    $scope.newEmployee = {
	        Name: "",
	        Position: "",
	        Supervisor: new Array(),
	        Subordinates: new Array(),
            Partners: new Array()
	    };

	    $scope.newPartner = {
	        Name: "",
	        Email: "",
	        Phone: "",
            Partners: new Array()
	    };

	    $scope.error = null;

	    $scope.supervisorName;
	    $scope.subordinateName;

	    $scope.init = function () {
            // Adding the employees
	        GetEmployees();

	        // Adding the partners
	        GetPartners();
	    }

	    $scope.$watch('partner', function () {
	        console.log($scope.partner);
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

	        if (typeof $routeParams.partnerName !== 'undefined') {
	            $scope.partnerName = $routeParams.partnerName;
	        }

	        if (typeof $routeParams.supervisorName !== 'undefined') {
	            $scope.supervisorName = $routeParams.supervisorName;
	        }

	        if (typeof $routeParams.subordinateName !== 'undefined') {
	            $scope.subordinateName = $routeParams.subordinateName;
	        }
	    });

	    $scope.$on('$routeChangeSuccess', function () {
	        GetEmployees();
	        GetPartners();

	        $scope.erorr = null;

	        $scope.newEmployee = {
	            Name: "",
	            Position: "",
	            Supervisor: new Array(),
	            Subordinates: new Array(),
	            Partners: new Array()
	        };

	        $scope.newPartner = {
	            Name: "",
	            Email: "",
	            Phone: "",
	            Partners: new Array()
	        };
	    });

	    $scope.RemoveEmployee = function (employeeID) {
	        RequestService.RemoveEmployee(employeeID);
	    };

	    $scope.RemovePartner = function (partnerID) {
	        RequestService.RemovePartner(partnerID);
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

	    $scope.SelfCheck = function (referenceObject, Object, performSubordinatesCheck) {
	        var result = true;

	        // Check for itself
	        if (referenceObject.ID == Object.ID) {
	            result = false;
	        }

	        // Only for subordinates
	        if (performSubordinatesCheck) {
	            for (var i = 0; i < Object.Supervisor.length; i++) {
	                if (referenceObject.ID == Object.Supervisor[i].ID) {
	                    result = false;
	                }
	            }
	        }

	        return result;
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

	    $scope.AddToNew = function (Object, Option) {
	        if (Option == "Subordinate") {
	            for (var i = 0; i < $scope.newEmployee.Subordinates.length; i++) {
	                if ($scope.newEmployee.Subordinates[i].ID == Object.ID) {
	                    $scope.newEmployee.Subordinates.splice(i, 1);

	                    return;
	                }
	            }

	            $scope.newEmployee.Subordinates.push(Object);
	        }
	        else if (Option == "Supervisor") {
	            for (var i = 0; i < $scope.newEmployee.Supervisor.length; i++) {
	                if ($scope.newEmployee.Supervisor[i].ID == Object.ID) {
	                    $scope.newEmployee.Supervisor.splice(i, 1);

	                    return;
	                }
	            }

	            $scope.newEmployee.Supervisor.push(Object);
	        }
	        else if (Option == "Partner") {
	            for (var i = 0; i < $scope.newEmployee.Partners.length; i++) {
	                if ($scope.newEmployee.Partners[i].ID == Object.ID) {
	                    $scope.newEmployee.Partners.splice(i, 1);

	                    return;
	                }
	            }

	            $scope.newEmployee.Partners.push(Object);
	        }
	        else if (Option == "Employee") {
	            for (var i = 0; i < $scope.newPartner.Partners.length; i++) {
	                if ($scope.newPartner.Partners[i].ID == Object.ID) {
	                    $scope.newPartner.Partners.splice(i, 1);

	                    return;
	                }
	            }

	            $scope.newPartner.Partners.push(Object);
	        }
	    }

	    $scope.UpdateEmployee = function () {
	        RequestService.UpdateEmployee($scope.employee);
	    }

	    $scope.UpdatePartner = function () {
	        RequestService.UpdatePartner($scope.partner);
	    }

	    $scope.AddEmployee = function () {
	        var check = true;

            // An employee cannot be a supervisor and a subordinate at the same time
	        for(var i = 0; i < $scope.newEmployee.Supervisor.length; i++)
	        {
	            for (var n = 0; n < $scope.newEmployee.Subordinates.length; n++) {
	                if ($scope.newEmployee.Supervisor[i].ID == $scope.newEmployee.Subordinates[n].ID) {
	                    check = false;
	                }
	            }
	        }

	        if (check) {
	            $scope.error = null;
	            RequestService.AddEmployee($scope.newEmployee);
	        }
	        else {
	            $scope.error = "A supervisor cannot be a subordinate at the same time";
	        }
	    }

	    $scope.AddPartner = function () {
	        RequestService.AddPartner($scope.newPartner);
	    }

	    $scope.RemoveManagement = function (supervisorID, subordinateID) {
	        RequestService.RemoveManagement(supervisorID, subordinateID);
	    };

	    $scope.RemovePartnership = function (partnerID, employeeID) {
	        RequestService.RemovePartnership(partnerID, employeeID);
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