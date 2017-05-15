console.log("ng ready!");

var myApp = angular.module('myApp', []);

myApp.controller('OmdbController', function($http) {
 // view model
 var vm = this;

 vm.searchResults = [];
 vm.searchInput = "";
 vm.favorites = [];

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

};//end searchOMBD()

vm.addtoFavs = function(id) {
  console.log("in add to favs function!");
  console.log("id: ", id);
  console.log(id.Title);

  movieToSendFavs = {
    title : id.Title,
    year : id.Year,
    // _id: id.imdbID,
    poster: id.Poster
  };

console.log("movie to send: ", movieToSendFavs);

  $http({
    method: 'POST',
    url: '/addfavorite',
    data: movieToSendFavs
  }).then(function success (response){
    console.log("response from server: ", response);
    vm.getFavorites();
  });
  // console.log(this.id);
};//end vm.addtoFavs

vm.getFavorites = function(){
  console.log("in get favorites function");
  $http({
    method: 'GET',
    url: '/getmovies',
  }).then(function success (response){
    console.log("response from server in get favorites: ", response);
    vm.favorites = response.data;
    console.log("vm.favorites = ",vm.favorites);
  });
};

vm.removeFav = function(foo){
  console.log("in remove favorites function");
  console.log(foo);
//
//   objectToSend = {
//     id: foo._id
//   };
//
//   console.log("Sending: ", objectToSend);
//
//   $http({
//     method: 'DELETE',
//     url: '/deletefavorite/'+foo.id
//     // data: objectToSend,
//   }).then(function success (response){
//     console.log(response);
//     console.log("movie removed");
//     vm.getFavorites();
//   });
};

});//end controller
