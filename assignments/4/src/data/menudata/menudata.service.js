(function () {
'use strict';

angular.module('data').
    service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http',"ApiBasePath"];
function MenuDataService ($http,ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    console.log("MenuDataService: getAllCategories")
    var url = ApiBasePath + "/categories.json"; 
    console.log("Url: ",url);
    return $http({
      method: "GET",
      url: url,
    });
  }

  service.getItemsByCategory = function (shortName) {
    console.log("MenuDataService: getItemsByCategory");
    var url = ApiBasePath + "/menu_items.json"; 
    console.log("Url: ",url+"?category="+shortName);
    return $http({
      method: "GET",
      url: url,
      data: {category: shortName}
    });
  }
  service.getCategoryByShortName = function (shortName,cats) {
    console.log("MenuDataService: getCategoryByShortName");
    console.log("ShortName: ",shortName);
    console.log("Categories: ", cats);
    var cat= cats.filter(function(cat) {
        return cat.short_name==shortName;
    });
    console.log("Category: ",cat);
    return cat?cat[0]:undefined; 
  }
}
})();
