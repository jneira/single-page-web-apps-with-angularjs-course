(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/item/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
