(function () {
"use strict";

angular.module('private')
.service('UserService', MockUserService);


MockUserService.$inject = ['$http', 'ApiPath'];
function MockUserService($http, ApiPath) {
  var service = this;
  var users ={"jneira": {"id":"jneira",
                         "firstName":"Javier","lastName":"Neira",
                         "email":"jneira@"+ApiPath,"phone":"666-666666",
                         "password":"password","favDish":"A1"}};
  var actualUser={};

  function addOrUpdateUser(user) {
    users[user.id]=user;
  }
  service.getUsers = function () {
    return users;
  };
  service.getUser = function (id) {
    return users[id];
  };
  service.login = function(id,pass) {
    if (!actualUser) {
      var user=service.getUser(id)
      if (user && user.password==pass)
        actualUser=user;
    }
    return actualUser;
  };
  
  service.signUp = function(user) {
    if (user && user.id) {
      var prev=addOrUpdateUser(user);
      actualUser=user;
    }
    return actualUser;
  }

  service.getActualUser = function() {
    return actualUser;
  };
}
})();
