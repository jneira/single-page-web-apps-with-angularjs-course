(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('MainController', MainController);

function DIController ($scope) {
  $scope.menu = "";

  $scope.checkIfTooMuch= function() {
    
  }

  console.log($injector.annotate(DIController));
}

function AnnonateMe(name, job, blah) {
  return "Blah!";
}

console.log(DIController.toString());

})();
