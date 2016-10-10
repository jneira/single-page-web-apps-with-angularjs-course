(function () {
'use strict';

angular.module('MenuApp').
    controller('CategoryController',CategoryController);

CategoryController.$inject=["categories","category"]
function CategoryController (categories,category) {
  var ctrl = this;
  console.log("CaterogyController: categories",categories)
  ctrl.categories=categories.data;
  ctrl.category=category;
}

})();
