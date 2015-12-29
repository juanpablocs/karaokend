(function () {
    angular
        .module('login', ['ngMaterial'])
        .controller('loginController', testController);


    function testController(){
        console.log(this);
        console.log('loginController');
    }
})();