'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('SearchCtrl', function ($scope, $state, SearchService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.displayResultByCategory = function(category, category_name, page){
            var records = 10;
            var start = (page - 1) * 10 + 1;
            var end = start + 9;

                SearchService.getOpeningsByCategory(category, category_name)
                    .success(function (data) {
                        $scope.result = data.response.docs;
                        console.log('displayResultByCategory:' + JSON.stringify(data));
                        $scope.resultCount = data.response.numFound;
                        $scope.pagination_message = '';
                        $scope.currentPage = page;

                        if ($scope.resultCount - start < 10) {
                            end = start + ($scope.resultCount - start);
                        }
                        $scope.maxSize = 5;

                        if ($scope.resultCount == 0) {
                            $scope.pagination_message = "No records Found";
                        } else {
                            $scope.pagination_message = 'Showing ' + start + ' - ' + end + ' Records of ' + $scope.resultCount;
                        }
                    }).error(function (error) {
                        console.log(error.msg);
                    });
            }
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
            alert($scope.category.category);
            $scope.displayResultByCategory('city',$scope.category.category,$scope.currentPage);

        };
 //       $scope.displayRecords(1);
        SearchService.getAllJobs()
            .success(function (data) {
            $scope.categoryList = data.facet_counts.facet_fields.City;

                console.log("categories:"+JSON.stringify(data.facet_counts.facet_fields.City));
                $scope.categories = {};
                var i = 0;
                for(var c=0;c<$scope.categoryList.length;c++)
                {
                    $scope.categories[i] = {};
                    $scope.categories[i].category = $scope.categoryList[c];
                    $scope.categories[i].count = $scope.categoryList[c+1];
                    c++; i++;
                }

            }).error(function (error) {
                console.log(error.msg);
            });

    });

