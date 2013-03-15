'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['Pagination', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/example1', {templateUrl: 'partials/example1.html', controller: ExampleController_1});
    $routeProvider.when('/example2', {templateUrl: 'partials/example2.html', controller: ExampleController_2});
    $routeProvider.when('/example3', {templateUrl: 'partials/example3.html', controller: ExampleController_3});
    $routeProvider.otherwise({redirectTo: '/example1'});
  }]);
