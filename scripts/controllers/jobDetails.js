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
                SearchService.getJobByJobDetailUrl($stateParams.JobDetailUrl)
                    .success (function (data){
                    console.log("data:"+JSON.stringify(data.response));

                    $scope.jobDetails = data.response.docs[0];
                    if(typeof $scope.jobDetails.Address == 'string')
                    {
                        $scope.jobDetails.Address = $scope.jobDetails.Address + ',';
                    }else{
                        $scope.jobDetails.Address = {};
                        $scope.jobDetails.Address = '';
                    }

                    if(typeof $scope.jobDetails.CompanyName != 'string')
                    {
                        $scope.jobDetails.CompanyName = {};
                        $scope.jobDetails.CompanyName = "";
                    }
                    if(typeof $scope.jobDetails.ApplyUrl != 'string')
                    {
                        $scope.jobDetails.ApplyUrl = {};
                        $scope.jobDetails.ApplyUrl = "";
                    }
                    if(typeof $scope.jobDetails.Industry != 'string')
                    {
                        $scope.jobDetails.Industry = {};
                        $scope.jobDetails.Industry = "";
                    }

                    if(typeof $scope.jobDetails.JobCategory != 'string')
                    {
                        $scope.jobDetails.JobCategory = {};
                        $scope.jobDetails.JobCategory = "";
                    }
                    if(typeof $scope.jobDetails.Role != 'string')
                    {
                        $scope.jobDetails.Role = {};
                        $scope.jobDetails.Role = "";
                    }
                    if(typeof $scope.jobDetails.YearsOfExperience != 'string')
                    {
                        $scope.jobDetails.YearsOfExperience = {};
                        $scope.jobDetails.YearsOfExperience = "";
                    }
                    if(typeof $scope.jobDetails.Department != 'string')
                    {
                        $scope.jobDetails.Department = {};
                        $scope.jobDetails.Department = "";
                    }
                    if(typeof $scope.jobDetails.Education != 'string')
                    {
                        $scope.jobDetails.Education = {};
                        $scope.jobDetails.Education = "";
                    }
                    if(typeof $scope.jobDetails.Website != 'string')
                    {
                        $scope.jobDetails.Website = {};
                        $scope.jobDetails.Website = "";
                    }
                    if(typeof $scope.jobDetails.Salary != 'string')
                    {
                        $scope.jobDetails.Salary = {};
                        $scope.jobDetails.Salary = "";
                    }
                    if(typeof $scope.jobDetails.DatePosted != 'string')
                    {
                        $scope.jobDetails.DatePosted = {};
                        $scope.jobDetails.DatePosted = "";
                    }
                    if(typeof $scope.jobDetails.ContactEmailAddress != 'string')
                    {
                        $scope.jobDetails.ContactEmailAddress = {};
                        $scope.jobDetails.ContactEmailAddress = "";
                    }
                    if(typeof $scope.jobDetails.CompanyProfile != 'string')
                    {
                        $scope.jobDetails.CompanyProfile = {};
                        $scope.jobDetails.CompanyProfile = "";
                    }
                    if(typeof $scope.jobDetails.City != 'string')
                    {
                        $scope.jobDetails.City = {};
                        $scope.jobDetails.City = "";
                    }
                    if (typeof $scope.jobDetails.Skills != 'string') {
                        $scope.jobDetails.Skills = {};
                        $scope.jobDetails.Skills = "";
                    }
                })
                    .error (function (error){
                    console.log (error.msg);});


       });
