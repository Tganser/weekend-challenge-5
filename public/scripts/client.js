console.log("ng ready!");

var myApp = angular.module('myApp', []);

myApp.controller('OmdbController', function($http) {
 // view model
 var vm = this;

 vm.searchResults = [];

 $http({
       method: 'GET',
       url: 'http://www.omdbapi.com/?s=<user search string>'
     }).then(function success(response) {
     console.log('response from OMDB: ', response.data);
    vm.movieData = response.data;
   });
 });
