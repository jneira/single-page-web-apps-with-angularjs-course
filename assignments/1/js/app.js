(function () {
'use strict';

angular.module('LunchCheck', [])
    .controller('MainController', MainController);

MainController.$inject = ['$scope'];
function MainController ($scope) {
  $scope.menu = "";
  $scope.message = "";
  $scope.checkIfTooMuch= function() {
    if (!$scope.menu) {
      $scope.message = "Please enter data first";
      return;
    }
    var items=$scope.menu.split(",")
    if (items.length <= 3)
      $scope.message = "Enjoy!";
    else 
      $scope.message = "Too much!";
  }
}
})();

