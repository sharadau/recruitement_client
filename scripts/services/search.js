'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.dashboard
 * @description
 * # dashboard
 * Service in the dashboardApp.
 */



angular.module('dashboardApp')
  .service('SearchService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

        this.searchAllOpenings = function () {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            $http.get(service_base_url+'/api/openings/')
                .success(function(item){
                    successCallback(item);
                })
                .error(function(error){
                    if (error) {
                        errorCallback({msg: 'No openings exists'});
                    }
                });

            return response;
        };
        this.searchOpeningsByTechnology = function (technology) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            $http.get('http://localhost:8983/solr/recruitement_site/select?q=*'+technology+'*~4&wt=json&indent=true&rows=30')
            //$http.get(service_base_url+'/api/openings/technology/'+technology)
                .success(function(item){
                    successCallback(item);
                })
                .error(function(error){
                    if (error) {
                        errorCallback({msg: 'No openings exists'});
                    }
                });


            return response;
        };
        this.getJobById = function (Id) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            $http.get('http://localhost:8983/solr/recruitement_site/select?q=id%3A'+Id+'&wt=json&indent=true')
                //$http.get(service_base_url+'/api/openings/technology/'+technology)
                .success(function(item){
                    successCallback(item);
                })
                .error(function(error){
                    if (error) {
                        errorCallback({msg: 'No job exists'});
                    }
                });


            return response;
        };


    });
