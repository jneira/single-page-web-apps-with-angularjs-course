(function () {
'use strict';

angular.module('MenuApp').
    controller('ItemController',ItemController);

ItemController.$inject=["category","items","$stateParams"]
function ItemController (category,items,$stateParams) {
  var ctrl = this;
  ctrl.items=items.data.menu_items;
  ctrl.category=category;
}

})();
