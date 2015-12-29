(function () {
  function LoginController($scope, $cookieStore, $location, GooglePlus){
    
    // login click connect
    $scope.clickLogin = function(){
      GooglePlus.login().then(function (authResult) {
          GooglePlus.getUser().then(function(u){
            console.log("user: ", u);
            $cookieStore.put('loginStatus', true);
            $cookieStore.put('user', u);
            $location.path('/');
          });
          
      }, function (err) {
          console.log(err);
      });
    }

    console.log(this);
    console.log('loginController');
  }
  app.controller('LoginController', LoginController);
})();
