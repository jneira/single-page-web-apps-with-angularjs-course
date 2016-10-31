(function () {
"use strict";

angular.module('private')
.controller('UserController', UserController);

UserController.$inject = ['menuItems','UserService','MenuService'];
function UserController(menuItems,UserService,MenuService) {
  console.log("En user controller")
  var $ctrl = this;
  $ctrl.menuItems = menuItems;
  $ctrl.actualUser = UserService.getActualUser();
  $ctrl.messages = [];
  console.log("Actual user: "+$ctrl.actualUser?$ctrl.actualUser.id:"");
  $ctrl.signUp = function(user) {
    function saveUser(user) {
      UserService.signUp(user);
      console.log("Users",UserService.getUsers());
      $ctrl.messages.push("Your information has been saved");
    }
    $ctrl.messages=[];
    console.log("En $ctrl.signup user:"+(user?user.id:"undefined"));
    if (user.favDish) {
      MenuService.getMenuItem(user.favDish).then(function(data){
        saveUser(user);
      }).catch(function(reason) {
        console.log("Error in get menu item "+user.favDish+": "+reason)
        $ctrl.messages.push("No such menu number exists.");
      });
    } else
      saveUser(user);
  }
}
})();
