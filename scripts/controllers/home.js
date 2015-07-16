'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });

