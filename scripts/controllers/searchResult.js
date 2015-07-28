'use strict';
  
/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('SearchResultCtrl', function ($scope, $state, $stateParams, SearchService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        $scope.searchText = $stateParams.searchText;
            console.log("$stateParams:"+JSON.stringify($stateParams.searchText));

        $scope.displayRecords = function(page) {
            if ($stateParams.searchText != '') {
                var records = 10;
                var start = (page - 1) * 10 + 1;
                var end = start + 9;

                SearchService.searchOpeningsByTechnology($stateParams.searchText, start, records)
                    .success(function (data) {
                    $scope.result = data.response.docs;
                    $scope.resultCount = data.response.numFound;
                    $scope.pagination_message = '';
                    $scope.currentPage = page;

                        if($scope.resultCount - start < 10)
                        {
                            end = start + ($scope.resultCount - start);
                        }
                    $scope.maxSize = 5;

                    if ($scope.resultCount == 0) {
                        $scope.pagination_message = "No records Found";
                    } else {
                        $scope.pagination_message = 'Showing '+start+' - ' + end + ' Records of ' + $scope.resultCount;
                    }
                })
                    .error(function (error) {
                    console.log(error.msg);
                });
            }
        }

        /*$scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };*/

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
            $scope.displayRecords($scope.currentPage);

        };
        $scope.displayRecords(1);


       });
