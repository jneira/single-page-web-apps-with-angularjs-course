(function () {

angular.module("NarrowItDownApp",[]).
    controller("NarrowItDownController",NarrowItDownController).
    service("MenuSearchService",MenuSearchService).
    constant('ApiBasePath', "https://davids-restaurant.herokuapp.com").
    directive("foundItems",FoundItemsDirective);

NarrowItDownController.$inject = ["MenuSearchService"]
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  ctrl.searchTerm = "";
  ctrl.found = [];
  ctrl.searchItems = function () {
    MenuSearchService.
      getMatchedMenuItems(ctrl.searchTerm).
      then(function(data) {
        ctrl.found=data;
      }).
      catch(function(err){
        console.log("Error fatal: "+err);
      });
  } 
  ctrl.removeItem = function(index) {
    ctrl.found.splice(index,1);
  };
  ctrl.searchItems()
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http,ApiBasePath){
  var service = this;
  var url=ApiBasePath+"/menu_items.json";
  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath + "/menu_items.json"
    }).then(function (response) {
      // process result and only keep items that match
      var items = response.data;
      var foundItems = items.menu_items.filter(function(it) {
        return it.description.indexOf(searchTerm)>=0;
      })
      // return processed items
      return foundItems;
    });
  }
}

function FoundItemsDirective () {
  var ddo = {
    templateUrl: './itemsList.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };
  return ddo;
}

})();

