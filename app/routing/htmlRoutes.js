var path = require("path");

// use these routes to direct the user in the html

module.exports = function (app) {
//sends a file using express in node
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/public/index.html'));
      });

    //==================================================================================
    //Moved to Server.js, Had to Change Routing B/c I used static.css File via Express
    //==================================================================================

    // app.get('/survey', function(req, res) {
    //     res.sendFile(path.join(__dirname, '/public/survey.html'));
    // });

     app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, '/public/index.html'));
      });
    
};