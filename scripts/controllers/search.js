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
            if (typeof $scope.result[k].Address == 'object') {
                $scope.result[k].Address[0] = $scope.result[k].Address[0] + ',';
            } else {
                $scope.result[k].Address = {};
                $scope.result[k].Address[0] = '';
            }

            if (typeof $scope.result[k].CompanyName != 'object') {
                $scope.result[k].CompanyName = {};
                $scope.result[k].CompanyName[0] = "";
            }
                if (typeof $scope.result[k].Skills != 'object') {
                    $scope.result[k].Skills = {};
                    $scope.result[k].Skills[0] = "";
                }
            if (typeof $scope.result[k].ApplyUrl != 'object') {
                $scope.result[k].ApplyUrl = {};
                $scope.result[k].ApplyUrl[0] = "";
            }
            if (typeof $scope.result[k].Industry != 'object') {
                $scope.result[k].Industry = {};
                $scope.result[k].Industry[0] = "";
            }

            if (typeof $scope.result[k].JobCategory != 'object') {
                $scope.result[k].JobCategory = {};
                $scope.result[k].JobCategory[0] = "";
            }
            if (typeof $scope.result[k].Role != 'object') {
                $scope.result[k].Role = {};
                $scope.result[k].Role[0] = "";
            }
            if (typeof $scope.result[k].YearsOfExperience != 'object') {
                $scope.result[k].YearsOfExperience = {};
                $scope.result[k].YearsOfExperience[0] = "";
            }
            if (typeof $scope.result[k].Department != 'object') {
                $scope.result[k].Department = {};
                $scope.result[k].Department[0] = "";
            }
            if (typeof $scope.result[k].Education != 'object') {
                $scope.result[k].Education = {};
                $scope.result[k].Education[0] = "";
            }
            if (typeof $scope.result[k].Website != 'object') {
                $scope.result[k].Website = {};
                $scope.result[k].Website[0] = "";
            }
            if (typeof $scope.result[k].Salary != 'object') {
                $scope.result[k].Salary = {};
                $scope.result[k].Salary[0] = "";
            }
            if (typeof $scope.result[k].DatePosted != 'object') {
                $scope.result[k].DatePosted = {};
                $scope.result[k].DatePosted[0] = "";
            }
            if (typeof $scope.result[k].ContactEmailAddress != 'object') {
                $scope.result[k].ContactEmailAddress = {};
                $scope.result[k].ContactEmailAddress[0] = "";
            }
            if (typeof $scope.result[k].CompanyProfile != 'object') {
                $scope.result[k].CompanyProfile = {};
                $scope.result[k].CompanyProfile[0] = "";
            }
            if (typeof $scope.result[k].City != 'object') {
                $scope.result[k].City = {};
                $scope.result[k].City[0] = "";
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
                            if(typeof $scope.result[m].ApplyUrl != 'object')
                            {
                                $scope.result[m].ApplyUrl = new Array();
                                $scope.result[m].ApplyUrl[0] = '';
                            }
                            $scope.result[m].JobDetailUrl1 = {};
                            if(typeof $scope.result[m].JobDetailUrl == 'object')
                            {
                                $scope.result[m].JobDetailUrl1[0] = $scope.result[m].JobDetailUrl[0];
                                $scope.result[m].JobDetailUrl1[0] = $scope.result[m].JobDetailUrl1[0].replace(/%2F/g,"needencoding");
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
                                if(typeof $scope.result[m].ApplyUrl != 'object')
                                {
                                    $scope.result[m].ApplyUrl = new Array();
                                    $scope.result[m].ApplyUrl[0] = '';
                                }
                                $scope.result[m].JobDetailUrl1 = {};
                                if(typeof $scope.result[m].JobDetailUrl == 'object')
                                {
                                    $scope.result[m].JobDetailUrl1[0] = $scope.result[m].JobDetailUrl[0];
                                    $scope.result[m].JobDetailUrl1[0] = $scope.result[m].JobDetailUrl1[0].replace(/%2F/g,"needencoding");
                                }
                            }
                            $scope.checkEmpty();
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
            return $http.get(service_base_url+'/select?q*%3A*&wt=json&indent=true&fl=City,JobTitle&start=0&records=20&facet=true&facet.field=City&facet.field=JobTitle&facet.field=CompanyName&facet.prefix='+val+'&facet.limit=5', {
            }).then(function(response){
                var newOne = new Array();
                console.log(response.data.facet_counts.facet_fields);
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