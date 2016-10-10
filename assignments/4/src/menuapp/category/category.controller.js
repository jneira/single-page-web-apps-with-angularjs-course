(function () {
'use strict';

angular.module('MenuApp').
    controller('CategoryController',CategoryController);

CategoryController.$inject=["categories","category"]
function CategoryController (categories,category) {
  var ctrl = this;
  if (category) {
    ctrl.title = "Category: "+category.name;
    ctrl.categories=[category];
    ctrl.isDetail = true
  } else {
    ctrl.title = "Categories";
    ctrl.categories=categories.data;
    ctrl.isDetail = false;
  }
}
})();
