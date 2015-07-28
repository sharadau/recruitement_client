'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('SearchCtrl', function ($scope, $state, $stateParams, SearchService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.result = {};
        $scope.searchFor = '';
        $scope.displayResult = function(category, category_name, page, newSearch){
            var records = 10;
            var start = (page - 1) * 10 + 1;
            var end = start + 9;
            
            if(category != '')
            {
                //alert("in cat search start:"+start+" end:"+end);
                $scope.searchFor = ' City '+ category_name;
                $scope.categoryName = category_name;
                $scope.searchText = '';
                SearchService.getOpeningsByCategory(category, category_name,start, records)
                    .success(function (data1) {
                        $scope.result = data1.response.docs;
                        //alert('displayResult:' + JSON.stringify(data1));
                        $scope.resultCount = data1.response.numFound;
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
            }else
            {
                //alert("in search text start:"+start+" end:"+end);
                $scope.searchFor = $scope.searchText;
                $scope.categoryName = '';
                if ($scope.searchText != '') {

                    SearchService.searchOpeningsByTechnology($scope.searchText, start, records)
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


            }

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
            if($scope.searchText != '')
            {
                $scope.displayResult('', '', $scope.currentPage,false);
            } else
            {
                $scope.displayResult('city',$scope.categoryName,$scope.currentPage,false);
            }

        };
 //       $scope.displayRecords(1);
        $scope.categoryLimit = 5;
        $scope.displayAllCities = function (limit) {
            if(limit == 0)
            {
                $scope.categoryLimit = 0;
            }else
            {
                $scope.categoryLimit = 5;
            }

            SearchService.getAllJobByCity(limit)
                .success(function (data) {
                    $scope.categoryList = data.facet_counts.facet_fields.City;

                    console.log("categories:" + JSON.stringify(data.facet_counts.facet_fields.City));
                    $scope.categories = {};
                    var i = 0;
                    for (var c = 0; c < $scope.categoryList.length; c++) {
                        $scope.categories[i] = {};
                        $scope.categories[i].category = $scope.categoryList[c];
                        $scope.categories[i].count = $scope.categoryList[c + 1];
                        c++;
                        i++;
                    }

                }).error(function (error) {
                    console.log(error.msg);
                });
        }
        $scope.displayAllCities(5);

    });

