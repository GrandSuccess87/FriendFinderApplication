//Basic structure: data and logic to manipulate data live on node server
//routes make that data and logic accessible 
//we use ajax on those routes to access that data to push changes to the client front end side


// Dependencies

var express = require("express");
//makes routing easier using node.js
var bodyParser = require("body-parser");
//body parser allows for the info received back to be in json form so it's easy to manipulate
var path = require("path");

// Sets up the Express App

var app = express();
// set variable app equal to express to make it easy to call it
var PORT = process.env.PORT || 4004;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 app.get('/survey', function(req, res) {
res.sendFile(path.join(__dirname, '/public/survey.html'));
    });


app.use(express.static("public"));

//works on local host and won't have to reconfigure it when deploying
// var apiRoutes = require('./app/routing/apiRoutes.js');

// Import my api routes into the path '/apiRoutes'
// app.use('/apiRoutes', apiRoutes);

// var htmlRoutes = require('./app/routing/htmlRoutes.js');

// Import my html routes into the path '/htmlRoutes'
// app.use('/htmlRoutes', apiRoutes);
// display api routes first because that's where we are pulling the data to display inside the html pages
require(path.join(__dirname, './app/routing/apiRoutes.js'))(app);

// include html routes and the app passed into the certain function which is express
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app);

// require(path.join(__dirname, './app/routing/apiRoutes'))(app);

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
// Starts the server to begin listening

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

// Sets up the Express app to handle data parsing

