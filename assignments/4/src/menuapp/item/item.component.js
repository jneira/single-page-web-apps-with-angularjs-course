(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/items/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
