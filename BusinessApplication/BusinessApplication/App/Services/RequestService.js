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