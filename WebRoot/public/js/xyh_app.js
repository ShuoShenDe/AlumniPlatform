/**
 * Created by Administrator on 2016/12/31.
 */
var app = angular.module('myapp',['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'template/infoA.html',
    }).
    when('/about', {
        templateUrl: 'template/infoB.html',
    }).
    otherwise({
        redirectTo: '/home'
    });
});
app.controller("indexController", function($scope) {
	  var COOKIE_SUBNAME = 'usersubname';  
	  var COOKIE_PASSWORD='userpassword';
	  $scope.loginURL="/YNU_XYPT/public/login.html";
	  $scope.registerURL="/YNU_XYPT/public/register.html";
	  //alert(typeof($.cookie(COOKIE_SUBNAME)) == 'undefined');//	
	  if(typeof($.cookie(COOKIE_SUBNAME)) != 'undefined'&&typeof($.cookie(COOKIE_PASSWORD)) != 'undefined')
	  {
		  if($.cookie(COOKIE_SUBNAME)!='null'&&$.cookie(COOKIE_PASSWORD)!='null')  
		  {
			 $scope.userLoginFlag=true;
			 $scope.usersubname=$.cookie(COOKIE_SUBNAME);
		 }else{
			 $scope.userLoginFlag=false;
		 }
	  }
	  else{
		 $scope.userLoginFlag=false;
	 }
	 $scope.loginOut=function(){
		$.cookie(COOKIE_SUBNAME, null);
		$.cookie(COOKIE_PASSWORD, null);
		location.href="/YNU_XYPT/public/index.html";
		return false;
	};
});
