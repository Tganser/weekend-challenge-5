console.log("ng ready!");

var myApp = angular.module('myApp', []);

myApp.controller('OmdbController', function($http) {
 // view model
 var vm = this;

 vm.searchResults = [];
 vm.searchInput = "";

 vm.searchOMDB = function() {
     console.log('in search OMDB ng-click');
     console.log("search input =", vm.searchInput);

   $http({
         method: 'GET',
         url: 'http://www.omdbapi.com/?s=' + vm.searchInput
       }).then(function success(response) {
       console.log('response from OMDB: ', response.data.Search);
      vm.searchResults = response.data.Search;
      // console.log(vm.movieData);
      // console.log(response.movieData);
    });//end then

};
});//end controller
