(function () {
'use strict';

angular.module('MenuApp').
    controller('CategoryController',CategoryController);

CategoryController.$inject=["categories"]
function CategoryController (categories) {
  var ctrl = this;
  console.log("CaterogyController: categories",categories)
  ctrl.categories=categories.data;
}

})();
