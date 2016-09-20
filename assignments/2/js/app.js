(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.factory('ShoppingListFactory', ShoppingListFactory);

ToBuyController.$inject = ['ShoppingListFactory'];
function  ToBuyController(ShoppingListFactory) {
  var ctrl = this;

  var toBuyList = ShoppingListFactory.toBuy;
  var boughtList = ShoppingListFactory.alreadyBought;

  ctrl.items = toBuyList.getItems();
  
  ctrl.buyItem = function (idx) {
    boughtList.addItem(ctrl.items[idx].name, 
                       ctrl.items[idx].quantity);
    toBuyList.removeItem(idx);
  }
  ctrl.isEmpty = toBuyList.isEmpty

}

AlreadyBoughtController.$inject = ['ShoppingListFactory'];
function AlreadyBoughtController(ShoppingListFactory) {
  var ctrl = this;
  var boughtList = ShoppingListFactory.alreadyBought;
  ctrl.items = boughtList.getItems();
  ctrl.isEmpty = boughtList.isEmpty
}

function ShoppingListService(defaultItems) {
  var service = this;

  // List of shopping items
  var items = defaultItems || [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
    
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.isEmpty = function() {
    return items.length == 0
  }
}

/**
 I use a factory to return an object with singleton instances of
 two different services, one for each list
*/
function ShoppingListFactory() {
  var defaultItems=[
    {name:"Sword",quantity:2},
    {name:"Axe",quantity:2},
    {name:"Shield",quantity:1},
    {name:"Helmet",quantity:2},
    {name:"Boots",quantity:1}
  ]

  var toBuyService=new ShoppingListService(defaultItems);
  var alreadyBoughtService=new ShoppingListService();
  var factory = {
    toBuy:  toBuyService,
    alreadyBought: alreadyBoughtService
  }

  return factory;
}

})();
