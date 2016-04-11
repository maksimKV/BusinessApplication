var app = angular.module('BusinessApplication');

app.directive('employees', ['RequestService', function (RequestService) {
	return {
		restrict: 'E',
		//templateUrl: "Directives/Templates/EmployeesTemplate.html",
		controller: function($scope, $http, $q) {
		    var jsonResponse = $scope.employees;
		    console.log(jsonResponse);
		    console.log("It get's to the directive");
		}
	};
}]);