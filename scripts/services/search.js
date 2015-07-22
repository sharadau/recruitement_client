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

        this.searchOpeningsByTechnology = function (technology, start, records) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            //alert(service_base_url+'/select?q=*'+technology+'*&start='+start+'&rows='+records+'&wt=json&indent=true');
            $http.get(service_base_url+'/select?q=*'+technology+'*&start='+start+'&rows='+records+'&wt=json&indent=true&hl=true&hl.fl=JobDescription+JobTitle+WholePosting&hl.simple.pre=<em>&hl.simple.post=<%2Fem>')
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
            $http.get(service_base_url+'/select?q=id%3A'+Id+'&wt=json&indent=true')
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
        this.getJobByJobDetailUrl = function (url) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            $http.get(service_base_url+'/select?q=JobDetailUrl%3A'+url+'&wt=json&indent=true')
                .success(function(item){
                    successCallback(item);
                })
                .error(function(error){
                    if (error) {
                        errorCallback({msg: 'No job exists with url '+url});
                    }
                });


            return response;
        };

    });
