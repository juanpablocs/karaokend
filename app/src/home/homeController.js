(function () {
    angular
        .module('home', ['ngMaterial'])
        .controller('homeController', testController);


    function testController(){
        console.log(this);
        console.log('homeController');
    }
})();