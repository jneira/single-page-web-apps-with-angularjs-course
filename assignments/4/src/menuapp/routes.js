(function () {
'use strict';

angular.module('MenuApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Premade list page
  .state('category', {
    url: '/category/{shortName}',
    templateUrl: 'src/menuapp/category/templates/category.index.template.html',
    controller: 'CategoryController as categoryCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        console.log("Resolving /category/: categories")
        var promise=  MenuDataService.getAllCategories();
        console.log("Promised categories: ", promise);
        return promise;
      }],
      category: ['$stateParams','MenuDataService','categories',
        function ($stateParams,MenuDataService,categories) {
          console.log("Resolving /category/"+$stateParams.shortName+": category")
          var cat= MenuDataService.getCategoryByShortName(
            $stateParams.shortName,categories.data);
          return cat;
        }]
      
    }
  })

  // Item detail
  .state('category.items', {
    url: '/item',
    templateUrl: 'src/menuapp/item/templates/item.index.template.html',
    controller: 'ItemController as itemCtrl',
    params: {shortName: null},
    resolve: {
      items: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
        console.log("Resolving /category/"+$stateParams.shortName+"/item/: items ")
        var promise= MenuDataService.getItemsByCategory(
          $stateParams.shortName);
        console.log("Promised items: ", promise);
        return promise;
      }]
    }
  });

  // .state('category.items.detail', {
  //   url: '/category/{categoryShortName}/item/{itemId}',
  //   templateUrl: 'src/menuapp/items/templates/item.template.html',
  //   controller: 'ItemController as itemCtrl'
  //   resolve : {
  //     item: ['$stateParams','items',function($stateParams,items) {
  //       return items[$stateParams.itemId];
  //     }]
  //   }
  // });
}

})();
