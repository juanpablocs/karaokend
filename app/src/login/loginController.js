(function () {
    function LoginController(){
        console.log(this);
        console.log('loginController');
    }
    app.controller('LoginController', LoginController);
})();
