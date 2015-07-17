'use strict';
  
/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('JobDetailsCtrl', function ($scope, $state, $stateParams, SearchService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        $scope.JobDetailUrl = $stateParams.JobDetailUrl;
        console.log('jobdetailsurl:'+$stateParams.JobDetailUrl);
                SearchService.getJobByJobDetailUrl($stateParams.JobDetailUrl)
                    .success (function (data){
                    //console.log("data:"+JSON.stringify(data.response));
                    $scope.jobDetails = data.response.docs[0];
                    console.log("Result:"+JSON.stringify($scope.jobDetails[0]))
                })
                    .error (function (error){
                    console.log (error.msg);});


       });
