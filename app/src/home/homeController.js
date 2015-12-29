(function () { 
    function HomeController(){
        console.log(this);
        console.log('homeController');
    } 
    app.controller('HomeController', HomeController);
})();
