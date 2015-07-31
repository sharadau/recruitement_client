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
            $http.get(service_base_url+'/select?q=JobDetailUrl%3A%22'+url+'%22&wt=json&indent=true')
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

        this.getOpeningsByCategory = function (category, category_name,start, records){
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
           // http://localhost:8983/solr/new_core1/select?q=City%3APune&wt=json&indent=true

            var catArray = category_name.split(',');
           // alert(records);
            //alert(service_base_url + '/select?q=City%3A%22' + category_name + '%22&start=' + start + '&rows=' + records + '&wt=json&indent=true&hl=true&hl.fl=JobDescription+JobTitle+WholePosting&hl.simple.pre=<em>&hl.simple.post=<%2Fem>');
            $http.get(service_base_url+'/select?q=City%3A%22'+category_name+'%22&start='+start+'&rows='+records+'&wt=json&indent=true&hl=true&hl.fl=JobDescription+JobTitle+WholePosting&hl.simple.pre=<em>&hl.simple.post=<%2Fem>')
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

        this.getAllJobByCity = function (limit) {
            var successCallback, errorCallback;
            var response = {
                success: function (callback) {successCallback = callback; return response;},
                error: function (callback) {errorCallback = callback; return response;}
            };
            var limitCondition = '';
            if(limit == 0)
            {
                limitCondition = '';
            }else
            {
                limitCondition = '&facet.limit='+limit;
            }

                $http.get(service_base_url+'/select?q=*%3A*&fl=City&wt=json&indent=true&facet=true&facet.field=City'+limitCondition)
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
