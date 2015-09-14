'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('SearchCtrl', function ($scope, $state, $stateParams, $http, SearchService,$modal) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.result = {};
        $scope.searchFor = '';

        $scope.checkEmpty = function() {
            for(var k=0;k<$scope.result.length;k++)
            {
            if (typeof $scope.result[k].Address == 'string') {
                $scope.result[k].Address = $scope.result[k].Address + ',';
            } else {
               // $scope.result[k].Address = {};
                $scope.result[k].Address = '';
            }

            if (typeof $scope.result[k].CompanyName != 'string') {
                //$scope.result[k].CompanyName = {};
                $scope.result[k].CompanyName = "";
            }else if($scope.searchText != ''){
                var regEx = new RegExp($scope.searchText , "ig");
                $scope.result[k].CompanyName = ($scope.result[k].CompanyName.replace(regEx,('<mark class="markstyle"><em>'+$scope.capitalise($scope.searchText)+'</em></mark>')));
            }
                $scope.result[k].JobTitle1 = $scope.result[k].JobTitle;
                if (typeof $scope.result[k].JobTitle != 'string') {
                    //$scope.result[k].CompanyName = {};
                    $scope.result[k].JobTitle = "";
                }else if($scope.searchText != ''){
                    $scope.result[k].JobTitle1 = ($scope.result[k].JobTitle.replace(new RegExp($scope.searchText , "ig"),('<mark class="markstyle"><em>'+$scope.capitalise($scope.searchText)+'</em></mark>')));
                }
                if (typeof $scope.result[k].Skills != 'string') {
                   // $scope.result[k].Skills = {};
                    $scope.result[k].Skills = "";
                }else if($scope.searchText != ''){
                    $scope.result[k].Skills = ($scope.result[k].Skills.replace(new RegExp($scope.searchText , "ig"),('<mark class="markstyle"><em>'+$scope.capitalise($scope.searchText)+'</em></mark>')));
                }
            if (typeof $scope.result[k].ApplyUrl != 'string') {
                $scope.result[k].ApplyUrl = "";
            }
                if (typeof $scope.result[k].Age != 'string' || $scope.result[k].Age == '0') {
                    $scope.result[k].Age = "Today";
                }

            if (typeof $scope.result[k].Industry != 'string') {
               // $scope.result[k].Industry = {};
                $scope.result[k].Industry = "";
            }

            if (typeof $scope.result[k].JobCategory != 'string') {
                //$scope.result[k].JobCategory = {};
                $scope.result[k].JobCategory = "";
            }else if($scope.searchText != ''){
                $scope.result[k].JobCategory = ($scope.result[k].JobCategory.replace(new RegExp($scope.searchText , "ig"),('<mark class="markstyle"><em>'+$scope.capitalise($scope.searchText)+'</em></mark>')));
            }
            if (typeof $scope.result[k].Role != 'string') {
                //$scope.result[k].Role = {};
                $scope.result[k].Role = "";
            }
            if (typeof $scope.result[k].YearsOfExperience != 'string') {
                //$scope.result[k].YearsOfExperience = {};
                $scope.result[k].YearsOfExperience = "";
            }
            if (typeof $scope.result[k].Department != 'string') {
                //$scope.result[k].Department = {};
                $scope.result[k].Department = "";
            }
            if (typeof $scope.result[k].Education != 'string') {
                //$scope.result[k].Education = {};
                $scope.result[k].Education = "";
            }
            if (typeof $scope.result[k].Website != 'string') {
                //$scope.result[k].Website = {};
                $scope.result[k].Website = "";
            }
            if (typeof $scope.result[k].Salary != 'string') {
                //$scope.result[k].Salary = {};
                $scope.result[k].Salary = "";
            }
            if (typeof $scope.result[k].DatePosted != 'string') {
                //$scope.result[k].DatePosted = {};
                $scope.result[k].DatePosted = "";
            }
            if (typeof $scope.result[k].ContactEmailAddress != 'string') {
                //$scope.result[k].ContactEmailAddress = {};
                $scope.result[k].ContactEmailAddress = "";
            }
            if (typeof $scope.result[k].CompanyProfile != 'string') {
                //$scope.result[k].CompanyProfile = {};
                //$scope.result[k].CompanyProfile = "";
            }
            if (typeof $scope.result[k].City != 'string') {
                //$scope.result[k].City = {};
                $scope.result[k].City = "";
            }else if($scope.searchText != ''){
                $scope.result[k].City = ($scope.result[k].City.replace(new RegExp($scope.searchText , "ig"),('<mark class="markstyle"><em>'+$scope.capitalise($scope.searchText)+'</em></mark>')));
            }
        }
        };
        $scope.displayResult = function(category, category_name, page, newSearch){
            var records = 10;
            var start = (page - 1) * 10;
            var end = start + 10;

            if(category != '')
            {
                //alert("in cat search start:"+start+" end:"+end);
                //$scope.searchFor = ' City '+ category_name;
                $scope.searchFor = ' Company '+ category_name;
                $scope.categoryName = category_name;
                $scope.searchText = '';
                SearchService.getOpeningsByCategory(category, category_name,start, records)
                    .success(function (data1) {
                        $scope.result = data1.response.docs;
                        for(var m=0;m<$scope.result.length;m++)
                        {
                            if(typeof $scope.result[m].ApplyUrl != 'string')
                            {
                                //$scope.result[m].ApplyUrl = new Array();
                                $scope.result[m].ApplyUrl = '';
                            }
                            //$scope.result[m].JobDetailUrl1 = {};
                            if(typeof $scope.result[m].JobDetailUrl == 'string')
                            {
                                $scope.result[m].JobDetailUrl1 = $scope.result[m].JobDetailUrl;
                                $scope.result[m].JobDetailUrl1 = $scope.result[m].JobDetailUrl1.replace(/%2F/g,"needencoding");
                            }

                        }
                        $scope.checkEmpty();
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
                            $scope.pagination_message = 'Showing ' + (start + 1) + ' - ' + end + ' Records of ' + $scope.resultCount;
                        }
                    }).error(function (error) {
                        console.log(error.msg);
                    });
            }else
            {
                $scope.searchFor = $scope.searchText;
                $scope.categoryName = '';
                if ($scope.searchText != '') {

                    SearchService.searchOpeningsByTechnology($scope.searchText, start, records)
                        .success(function (data) {
                            $scope.result = data.response.docs;
                            for(var m=0;m<$scope.result.length;m++)
                            {
                                if(typeof $scope.result[m].ApplyUrl != 'string')
                                {
                                   // $scope.result[m].ApplyUrl = new Array();
                                    $scope.result[m].ApplyUrl = '';
                                }
                                //$scope.result[m].JobDetailUrl1 = {};
                                if(typeof $scope.result[m].JobDetailUrl == 'string')
                                {
                                    $scope.result[m].JobDetailUrl1 = $scope.result[m].JobDetailUrl;
                                    $scope.result[m].JobDetailUrl1 = $scope.result[m].JobDetailUrl1.replace(/%2F/g,"needencoding");
                                }
                            }
                            $scope.checkEmpty();
                            console.log("data:"+$scope.result);
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
                                $scope.pagination_message = 'Showing '+(start+1)+' - ' + end + ' Records of ' + $scope.resultCount;
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

          //  SearchService.getAllJobByCity(limit)
            SearchService.getAllJobByCompany(limit)
                .success(function (data) {
                   // $scope.categoryList = data.facet_counts.facet_fields.City;
                    $scope.categoryList = data.facet_counts.facet_fields.CompanyName;

                    console.log("categories:" + JSON.stringify(data.facet_counts.facet_fields.CompanyName));
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

        $scope.capitalise = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        $scope.getOpeningsStartsWith = function(val)
        {
            val = $scope.capitalise(val);
            //alert(service_base_url+'/select?q*%3A*&wt=json&indent=true&fl=City,JobTitle,JobCategory,Skills&start=0&records=20&facet=true&facet.field=City&facet.field=JobTitle&facet.field=Skills&facet.field=JobCategory&facet.field=CompanyName&facet.prefix='+val+'&facet.limit=5');
            return $http.get(service_base_url+'/select?q*%3A*&wt=json&indent=true&fl=City,JobTitle,JobCategory,Skills&start=0&records=20&facet=true&facet.field=City&facet.field=JobTitle&facet.field=Skills&facet.field=JobCategory&facet.field=CompanyName&facet.prefix='+val+'&facet.limit=5', {
            }).then(function(response){
                var newOne = new Array();
                console.log("facets:"+JSON.stringify(response.data.facet_counts.facet_fields));
                var q=0;
                for(var d=0;d<response.data.facet_counts.facet_fields.City.length;d=d+2) {
                        newOne[q] =  response.data.facet_counts.facet_fields.City[d];
                    q++;
                }
                for(var d=0;d<response.data.facet_counts.facet_fields.JobTitle.length;d=d+2) {
                    newOne[q] =  response.data.facet_counts.facet_fields.JobTitle[d];
                    q++;
                }
                for(var d=0;d<response.data.facet_counts.facet_fields.CompanyName.length;d=d+2) {
                    newOne[q] =  response.data.facet_counts.facet_fields.CompanyName[d];
                    q++;
                }
                for(var d=0;d<response.data.facet_counts.facet_fields.Skills.length;d=d+2) {
                    newOne[q] =  response.data.facet_counts.facet_fields.Skills[d];
                    q++;
                }
                for(var d=0;d<response.data.facet_counts.facet_fields.JobCategory.length;d=d+2) {
                    newOne[q] =  response.data.facet_counts.facet_fields.JobCategory[d];
                    q++;
                }
                response.data = new Array();
                response.data = newOne;
                return response.data.map(function(item){
                    return item;
                });

            });

        }
        $scope.open = function (title,desc,applyurl,jobDetailsUrl) {
            var appurllink = '';
            if(applyurl != '') {
                 appurllink = "Apply";
            }
            var modalInstance = $modal.open({
                animation: true,
                template: '<div class="modal-header"><h3 class="modal-title">'+title+'</h3><h4 class="modal-title"> <a target="_blank" href="'+applyurl+'">'+appurllink+'</a></h4></div><div class="modal-body"><textarea rows="20" cols="140" readonly>'+desc+'</textarea><a target="_blank" href="'+jobDetailsUrl+'">'+jobDetailsUrl+'</a></h4></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button></div>',
                //template: 'contents:'+contents,
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });

        };
    });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
angular.module('dashboardApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});