(function() {
'use strict';

angular.module('private')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  console.log("Configuring private routes");
  
  // Routes
  $stateProvider 
    .state('user', {
      abstract: true,
      templateUrl: 'src/private/user/index.html',
    }) 
    .state('user.home', {
      url: '/user/{userId}',
      templateUrl: 'src/private/user/home.html',
      controller: 'UserController',
      controllerAs: 'userCtrl',
    }) 
    .state('user.signup', {
      url: '/signup',
      templateUrl: 'src/private/user/signup.html',
      controller: 'UserController',
      controllerAs: 'userCtrl'
    });

}
})();
