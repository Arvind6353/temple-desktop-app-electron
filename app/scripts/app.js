(function () {
    'use strict';

    var app = angular.module(
        'app',
        [
            
            'ngMaterial',
            'ngAnimate',
            'ui.router',
            'md.data.table',
            'ngMdIcons'
        ]
    );
    app.config(
        [
            '$urlRouterProvider','$stateProvider','$httpProvider',
            function ($urlRouterProvider,$stateProvider,$httpProvider) {
               
                 $stateProvider
                         .state('home', {
                            url: '/',
                             templateUrl: './scripts/home/home.html',
                             controller:'MenuController'
                        })
                        
                        .state('insert', {
                            url: '/insert',
                           templateUrl: './scripts/insert/insert.html',
                            controller:'InsertController'

                        })

                         .state('search', {
                            url: '/search',
                           templateUrl: './scripts/search/search.html',
                            controller:'SearchController'

                        })


                         .state('error', {
                            url: '/error',
                           templateUrl: './scripts/error/error.html',
                            controller:'ErrorController'

                        }) 

                           .state('print', {
                            url: '/print',
                           templateUrl: './scripts/print/print.html',
                            controller:'PrintController',
                            reload:true

                        }) 
                         .state('payment', {
                            url: '/payment',
                           templateUrl: './scripts/payment/payment.html',
                            controller:'PaymentController'
                        }) 
                          .state('searchPayment', {
                            url: '/searchPayment',
                           templateUrl: './scripts/payment/searchPayment.html',
                            controller:'SearchPaymentController'
                        }) 

                 $urlRouterProvider.otherwise('/');
            
   
              $httpProvider.interceptors.push('httpRequestInterceptor');
    }

   ] );


    app.factory('httpRequestInterceptor',['$q','$injector', function ($q, $injector) {
        return {
            response: function(response){
                  return response;
              },
              responseError: function(rejection) {
                  alert("error");
                   var stateService = $injector.get('$state');
                        stateService.go('error');
                    
              }
          
          }
  
}]);


    

})();