(function () {
'use strict';

angular.module('MenuApp').
    controller('ItemController',ItemController);

ItemController.$inject=["items","$stateParams"]
function ItemController (items,$stateParams) {
  var ctrl = this;
  console.log("ItemController: items",items)
  ctrl.items=items.data;
}

})();
