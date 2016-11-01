(function () {
"use strict";

angular.module('private')
.controller('UserController', UserController);

UserController.$inject = ['UserService','MenuService'];
function UserController(UserService,MenuService) {
  
  function getMenuItem(id,onSuccess,onError) {
    MenuService.getMenuItem(id).then(function(data){
        onSuccess(data);
      }).catch(function(reason) {
        onError(reason); 
      });
  } 

  function saveUser(user) {
    UserService.signUp(user);
  }
  
  console.log("En user controller")
  var $ctrl = this;
  
  $ctrl.actualUser = UserService.getActualUser();
  $ctrl.newUser={};  
  console.log("Actual user: "+$ctrl.actualUser)
  if ($ctrl.actualUser && $ctrl.actualUser.favDish)
    getMenuItem($ctrl.actualUser.favDish.short_name,function(data) {
      $ctrl.actualUser.favDish=data;
    },function (reason) {
      console.log("Error retrieven menu item");
    });
  $ctrl.messages = [];
  console.log("Actual user: "+$ctrl.actualUser?$ctrl.actualUser.id:"");
  
  $ctrl.signUp = function(user) {
    $ctrl.messages=[];
    console.log("En $ctrl.signup user: "+(user?user.id:"undefined"));
    if (user.favDish) {
      getMenuItem(user.favDish.short_name,function(data) {
        saveUser(user);
        $ctrl.messages.push("Your information has been saved");
      },function(reason) {
        console.log("Error in get menu item "+user.favDish+": "+reason);
        $ctrl.messages.push("No such menu number exists.");
      });
    } else
      saveUser(user);
  }
}
})();
