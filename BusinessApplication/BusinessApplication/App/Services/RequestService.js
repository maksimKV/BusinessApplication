var app = angular.module('BusinessApplication');

app.factory('RequestService', function ($http, $location) {
    var RequestService = {};

    RequestService.AllEmployees = function () {
        return $http.get('http://localhost:60910/employees').then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.SingleEmployee = function (id) {
        return $http.get('http://localhost:60910/employees/view/' + id).then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.RemoveEmployee = function (id) {
        return $http.get('http://localhost:60910/employees/remove/' + id).then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.RemoveManagement = function (supervisorID, subordinateID) {
        return $http.get('http://localhost:60910/employees/remove/dependencies/' + supervisorID + '/' + subordinateID).then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.UpdateEmployee = function (object) {
        return $http.post('http://localhost:60910/employees/update', object).then(function (response) {
            return $location.path('/employee/updated/' + object.Name);
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.AddEmployee = function (object) {
        return $http.post('http://localhost:60910/employees/add', object).then(function (response) {
            return $location.path('/employee/added/' + object.Name);
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.AllPartners = function () {
        return $http.get('http://localhost:60910/partners').then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.SinglePartner = function (id) {
        return $http.get('http://localhost:60910/partners/view/' + id).then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.UpdatePartner = function (object) {
        return $http.post('http://localhost:60910/partners/update', object).then(function (response) {
            return $location.path('/partner/updated/' + object.Name);
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.AddPartner = function (object) {
        return $http.post('http://localhost:60910/partners/add', object).then(function (response) {
            return $location.path('/partner/added/' + object.Name);
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    RequestService.RemovePartner = function (id) {
        return $http.get('http://localhost:60910/partners/remove/' + id).then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return $location.path('/error');
        });
    }

    return RequestService;
});