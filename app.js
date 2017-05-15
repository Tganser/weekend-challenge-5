// requires
// node modules
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var path = require( 'path' );
var mongoose = require('mongoose');

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );


app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});

//createDB
mongoose.connect('localhost:27017/favmovies');

//creating schema
var theSchema = mongoose.Schema({
  title: String,
  year: String,
  // id: Number,
  poster: String,
});

//make schema collection
var movies = mongoose.model('movies', theSchema);


app.post('/addfavorite', function(req, res){
  // console.log('req.body.name:', req.body.name);
  console.log("in add favorite routes server");
  var newMovie = movies(req.body);
  console.log("req.body ->" + req.body);
  console.log("new Movie = "+newMovie);
  newMovie.save().then(function(){
    res.sendStatus(200);

  });
});

app.get('/getmovies', function(req, res){
  console.log('in get movies route server');
  movies.find().then(function(data){
    res.send(data);
  });
});

app.delete('/deletefavorite', function(req, res){
  // console.log('req.body.name:', req.body.name);
  console.log("in delete favorite routes server");
  // console.log(req.params);
  // console.log(req.params.id);
  // movies.remove( { _id: req.params.id}, function(err) {
  //  if ( err ) {
  //    res.send( 400 );
  //  } //end Error
  //  else {
  //    res.send( 200 );
  //  } // end no error
  // });

  });

// globals
var port = process.env.PORT || 3456;

// spin up server
app.listen( port, function() {
  console.log( 'server up on:', port );
});
