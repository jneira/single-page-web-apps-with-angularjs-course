(function () {
"use strict";

angular.module('private')
.component('userInfo', {
  templateUrl: 'src/private/user/user-info.html',
  bindings: {
    user: '<',
    read: '=?',
    onSubmit: '&?'
  }
});



})();
