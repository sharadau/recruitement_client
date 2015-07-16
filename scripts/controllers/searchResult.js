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
        //$scope.searchOpenings = function () {
            console.log("$stateParams:"+JSON.stringify($stateParams.searchText));
       /* var response = {
            "responseHeader":{
                "status":0,
                "QTime":1,
                "params":{
                    "indent":"true",
                    "q":"*:*",
                    "wt":"json"}},
            "response":{"numFound":10,"start":0,"docs":[
                {
                    "id":"553573403",
                    "cat":["book"],
                    "name":["A Game of Thrones"],
                    "price":[7.99],
                    "inStock":[true],
                    "author":["George R.R. Martin"],
                    "series_t":["A Song of Ice and Fire"],
                    "sequence_i":1,
                    "genre_s":"fantasy",
                    "_version_":1506671403182587904},
                {
                    "id":"553579908",
                    "cat":["book"],
                    "name":["A Clash of Kings"],
                    "price":[7.99],
                    "inStock":[true],
                    "author":["George R.R. Martin"],
                    "series_t":["A Song of Ice and Fire"],
                    "sequence_i":2,
                    "genre_s":"fantasy",
                    "_version_":1506671403225579520},
                {
                    "id":"055357342X",
                    "cat":["book"],
                    "name":["A Storm of Swords"],
                    "price":[7.99],
                    "inStock":[true],
                    "author":["George R.R. Martin"],
                    "series_t":["A Song of Ice and Fire"],
                    "sequence_i":3,
                    "genre_s":"fantasy",
                    "_version_":1506671403227676672},
                {
                    "id":"553293354",
                    "cat":["book"],
                    "name":["Foundation"],
                    "price":[7.99],
                    "inStock":[true],
                    "author":["Isaac Asimov"],
                    "series_t":["Foundation Novels"],
                    "sequence_i":1,
                    "genre_s":"scifi",
                    "_version_":1506671403228725248},
                {
                    "id":"812521390",
                    "cat":["book"],
                    "name":["The Black Company"],
                    "price":[6.99],
                    "inStock":[false],
                    "author":["Glen Cook"],
                    "series_t":["The Chronicles of The Black Company"],
                    "sequence_i":1,
                    "genre_s":"fantasy",
                    "_version_":1506671403230822400},
                {
                    "id":"812550706",
                    "cat":["book"],
                    "name":["Ender's Game"],
                    "price":[6.99],
                    "inStock":[true],
                    "author":["Orson Scott Card"],
                    "series_t":["Ender"],
                    "sequence_i":1,
                    "genre_s":"scifi",
                    "_version_":1506671403232919552},
                {
                    "id":"441385532",
                    "cat":["book"],
                    "name":["Jhereg"],
                    "price":[7.95],
                    "inStock":[false],
                    "author":["Steven Brust"],
                    "series_t":["Vlad Taltos"],
                    "sequence_i":1,
                    "genre_s":"fantasy",
                    "_version_":1506671403237113856},
                {
                    "id":"380014300",
                    "cat":["book"],
                    "name":["Nine Princes In Amber"],
                    "price":[6.99],
                    "inStock":[true],
                    "author":["Roger Zelazny"],
                    "series_t":["the Chronicles of Amber"],
                    "sequence_i":1,
                    "genre_s":"fantasy",
                    "_version_":1506671403238162432},
                {
                    "id":"805080481",
                    "cat":["book"],
                    "name":["The Book of Three"],
                    "price":[5.99],
                    "inStock":[true],
                    "author":["Lloyd Alexander"],
                    "series_t":["The Chronicles of Prydain"],
                    "sequence_i":1,
                    "genre_s":"fantasy",
                    "_version_":1506671403240259584},
                {
                    "id":"080508049X",
                    "cat":["book"],
                    "name":["The Black Cauldron"],
                    "price":[5.99],
                    "inStock":[true],
                    "author":["Lloyd Alexander"],
                    "series_t":["The Chronicles of Prydain"],
                    "sequence_i":2,
                    "genre_s":"fantasy",
                    "_version_":1506671403241308160}]
            }};*/

       // $scope.result = response.response.docs;
       // console.log("result:"+JSON.stringify($scope.result[0].cat));

            if($stateParams.searchText != '')
            {
                console.log("in");
                SearchService.searchOpeningsByTechnology($stateParams.searchText)
                    .success (function (data){
                    //console.log("data:"+JSON.stringify(data.response));
                    $scope.result = data.response.docs;
                    $scope.resultCount = data.response.numFound;
                    $scope.pagination_message ='';
                    if($scope.resultCount == 0)
                    {
                        $scope.pagination_message = "No records Found";
                    }else if($scope.resultCount < 30)
                    {
                        $scope.topRange = $scope.resultCount;
                        $scope.pagination_message = 'Showing 1 - '+$scope.topRange+' Records of '+$scope.resultCount;
                    }else if($scope.resultCount > 30)
                    {
                        $scope.topRange = 30;
                        $scope.pagination_message = 'Showing 1 - '+$scope.topRange+' Records of '+$scope.resultCount;
                    }

                    console.log("Result:"+JSON.stringify($scope.result[0]))
                })
                    .error (function (error){
                    console.log (error.msg);});
            }
        //};

       });
