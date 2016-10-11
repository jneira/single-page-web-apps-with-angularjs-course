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
    templateUrl: 
      'src/menuapp/category/templates/category.index.template.html',
    controller: 'CategoryController as categoryCtrl',
    params: {shortName:null},
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        console.log("Resolving /category/: categories")
        var promise=  MenuDataService.getAllCategories();
        console.log("Promised categories: ", promise);
        return promise;
      }],
      category: ['$stateParams','MenuDataService','categories',
        function ($stateParams,MenuDataService,categories) {
          console.log("Resolving /category/"+$stateParams.shortName+
                      ": category")
          var cat= MenuDataService.getCategoryByShortName(
            $stateParams.shortName,categories.data);
          return cat;
        }]
      
    }
  })

  // Item detail
  .state('category.items', {
    url: '/item/{itemId}',
    templateUrl: 'src/menuapp/item/templates/item.index.template.html',
    controller: 'ItemController as itemCtrl',
    params: {shortName:null,itemId: null},
    resolve: {
      items: ['$stateParams','MenuDataService','category', 
        function ($stateParams,MenuDataService,category) {
          var shortName=$stateParams.shortName || category.short_name;
          console.log("Resolving /category/"+shortName+
                      "/item/: items ")
          var promise= MenuDataService.getItemsByCategory(shortName);
          console.log("Promised items: ", promise);
          return promise;
        }]
    }
  });
}
})();
