(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/category/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
