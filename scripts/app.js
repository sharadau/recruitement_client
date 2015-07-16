'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'chart.js',
        'angularFileUpload',
        'auth0',
        'angular-storage',
        'angular-jwt'
  ]).config(function($stateProvider, $urlRouterProvider,authProvider, jwtInterceptorProvider,$httpProvider) {
    //
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/home");
    //
        authProvider.init({
            domain: 'salesdashboard.eu.auth0.com',
            clientID: '4giAC9q7kSxqgPbuh0cnv7p7cgtf310i',
            callbackUrl: location.href,
            loginState: 'login'
        })
        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('token');
        }
        $httpProvider.interceptors.push('jwtInterceptor');
    // Now set up the states
    $stateProvider
      /*  .state("login",{
            templateUrl:"views/login.html",
            controller:"LoginCtrl",
            url:"/login"
        })
        .state("auth",{
            templateUrl:"views/authenticated.html",
            controller:"AuthCtrl",
            abstract: true,
            data: {
                requiresLogin: true
            }
        })*/
    .state('dashboard', {
        url: "/dashboard",
        templateUrl: "views/dashboard.html",
        controller: "DashboardCtrl"
      })
        .state('search', {
            url: "/search",
            templateUrl: "views/search.html",
            controller: "SearchCtrl"
        })
        .state('searchResult', {
            url: "/searchResult/:searchText",
            templateUrl: "views/search_result.html",
            controller: "SearchResultCtrl"
        })
        .state('jobDetails', {
            url: "/job_details/:jobId",
            templateUrl: "views/job_details.html",
            controller: "JobDetailsCtrl"
        })
      .state('home', {
        url: "/home",
        templateUrl: "views/home.html",
        controller: "HomeCtrl"
      })

        // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
        // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
        // want to check the delegation-token example
        $httpProvider.interceptors.push('jwtInterceptor');
    })

    .run(function($state,auth){
        auth.hookEvents();
        $state.go("search");
    })
