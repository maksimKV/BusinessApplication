﻿var app = angular.module('BusinessApplication');

app.factory('RequestService', function ($http) {
    var RequestService = {};

    RequestService.AllEmployees = function () {
        return $http.get('http://localhost:60910/employees').then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return [];
        });
    }

    RequestService.AllPartners = function () {
        return $http.get('http://localhost:60910/partners').then(function (response) {
            return response.data;
        }, function (error) {
            console.log(error);
            return [];
        });
    }

    return RequestService;
});