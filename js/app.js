var materialAdmin = angular.module('materialAdmin', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    // 'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',
    'djds4rce.angular-socialshare',
    
 
   
    
])
.run(
    function ($rootScope,$FB) {
        

       // $rootScope.RestDomainUrl = "http://localhost:8888/reciprocasrest/web/app_dev.php/";
       // // $rootScope.AngularDomainUrl = "http://localhost:8888/recipo/";
       // $rootScope.RestDomainUrl = "http://localhost:8000/Symfony_Angularjs/RecopricasRestApi/web/app_dev.php/";
       // $rootScope.AngularDomainUrl = "http://localhost:8000/Symfony_Angularjs/recipo/";

        // $rootScope.RestDomainUrl = "http://georgesamy.com/reciprocasrest/web/app_dev.php/";
        // $rootScope.AngularDomainUrl = "http://georgesamy.com/recipo/";
        $rootScope.RestDomainUrl = "http://equation-solutions.com/reciprocas/reciprocasrest/web/app_dev.php/";
        $rootScope.AngularDomainUrl = "http://equation-solutions.com/reciprocas/reciprocasangular/demo/recipo/";

        $rootScope.User={firstname:"", lastname:"" , imageurl:""};
        $rootScope.NewsfeedTimeout = 399000;
        $rootScope.StopNewsFeed = 0;
        $FB.init('935541813227426');
            
    }
   
);
 