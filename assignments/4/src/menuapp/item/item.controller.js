(function () {
'use strict';

angular.module('MenuApp').
    controller('ItemController',ItemController);

ItemController.$inject=["category","items","$stateParams"]
function ItemController (category,items,$stateParams) {
  var ctrl = this;
  console.log("ItemController: items: ",items)
  console.log("ItemController: category: ",category)
  ctrl.items=items.data;
  ctrl.category=category;
}

})();
