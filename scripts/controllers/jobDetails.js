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
                    //console.log("data:"+JSON.stringify(data.response));

                    $scope.jobDetails = data.response.docs[0];
                    if(typeof $scope.jobDetails.Address == 'object')
                    {
                        $scope.jobDetails.Address[0] = $scope.jobDetails.Address[0] + ',';
                    }else{
                        $scope.jobDetails.Address = {};
                        $scope.jobDetails.Address[0] = '';
                    }

                    if(typeof $scope.jobDetails.CompanyName != 'object')
                    {
                        $scope.jobDetails.CompanyName = {};
                        $scope.jobDetails.CompanyName[0] = "";
                    }
                    if(typeof $scope.jobDetails.ApplyUrl != 'object')
                    {
                        $scope.jobDetails.ApplyUrl = {};
                        $scope.jobDetails.ApplyUrl[0] = "";
                    }
                    if(typeof $scope.jobDetails.Industry != 'object')
                    {
                        $scope.jobDetails.Industry = {};
                        $scope.jobDetails.Industry[0] = "";
                    }

                    if(typeof $scope.jobDetails.JobCategory != 'object')
                    {
                        $scope.jobDetails.JobCategory = {};
                        $scope.jobDetails.JobCategory[0] = "";
                    }
                    if(typeof $scope.jobDetails.Role != 'object')
                    {
                        $scope.jobDetails.Role = {};
                        $scope.jobDetails.Role[0] = "";
                    }
                    if(typeof $scope.jobDetails.YearsOfExperience != 'object')
                    {
                        $scope.jobDetails.YearsOfExperience = {};
                        $scope.jobDetails.YearsOfExperience[0] = "";
                    }
                    if(typeof $scope.jobDetails.Department != 'object')
                    {
                        $scope.jobDetails.Department = {};
                        $scope.jobDetails.Department[0] = "";
                    }
                    if(typeof $scope.jobDetails.Education != 'object')
                    {
                        $scope.jobDetails.Education = {};
                        $scope.jobDetails.Education[0] = "";
                    }
                    if(typeof $scope.jobDetails.Website != 'object')
                    {
                        $scope.jobDetails.Website = {};
                        $scope.jobDetails.Website[0] = "";
                    }
                    if(typeof $scope.jobDetails.Salary != 'object')
                    {
                        $scope.jobDetails.Salary = {};
                        $scope.jobDetails.Salary[0] = "";
                    }
                    if(typeof $scope.jobDetails.DatePosted != 'object')
                    {
                        $scope.jobDetails.DatePosted = {};
                        $scope.jobDetails.DatePosted[0] = "";
                    }
                    if(typeof $scope.jobDetails.ContactEmailAddress != 'object')
                    {
                        $scope.jobDetails.ContactEmailAddress = {};
                        $scope.jobDetails.ContactEmailAddress[0] = "";
                    }
                    if(typeof $scope.jobDetails.CompanyProfile != 'object')
                    {
                        $scope.jobDetails.CompanyProfile = {};
                        $scope.jobDetails.CompanyProfile[0] = "";
                    }
                    if(typeof $scope.jobDetails.City != 'object')
                    {
                        $scope.jobDetails.City = {};
                        $scope.jobDetails.City[0] = "";
                    }
                    if (typeof $scope.jobDetails.Skills != 'object') {
                        $scope.jobDetails.Skills = {};
                        $scope.jobDetails.Skills[0] = "";
                    }
                })
                    .error (function (error){
                    console.log (error.msg);});


       });
