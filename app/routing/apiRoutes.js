//determins what data the user sees and what the user is able to post to the server to store
var friendData = require('../data/friends.js');

module.exports = function (app) {

        //Get Function when the url: api/survey is visited, display survey data in json format
        // This will be used to display a JSON of all possible friends
        app.get('/api/friends', function (req, res) {
            console.log("Get: /api/friends");
            res.json(friendData);
        })


        // This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
        //when a user fills out the survey they are issuing a post request
        app.post('/api/friends', function (req, res) {
            console.log("Post /api/friends");
                // res.json(friendData);


                // var friends = friendArray;
                var userInput = req.body;
                var userResult = userInput.scores;
                console.log("User Score Input: " + userResult);
                
                var totalDifference = 0;
            //need to store name, photo and total score difference, total difference closest to 0 between two people = best match
            //compare the difference between the current users scores against those from other existing users for each question
            
                var bestMatch = {
                    name: "",
                    photo: "",
                    difference: 50,
                }

                for (var i = 0; i < friendData.length; i++) {
                    for (var j = 0; j < userResult.length; j++) {
            //find calculation for absolute value to compare the answer score arrays and use that for total difference
            //then compare total difference to bestMatch.difference
                            // console.log("Friend Score: " + friendData[i]);
                        totalDifference += Math.abs(parseInt(friendData[i].scores[j])-userResult[j]);
                            console.log("Friend Score: " + friendData[i].scores[j]);
                            console.log("User Result Score: " + userResult[j]);
                            console.log("Total Difference Is: " + totalDifference);

                            if(totalDifference <= bestMatch.difference) {
                                bestMatch.name = friendData[i].name;
                                bestMatch.photo = friendData[i].photo;
                                bestMatch.difference = totalDifference;
                                console.log("You're Most Compatible With " + bestMatch.name + "!!");
                                console.log("Image: " + bestMatch.photo);
                            }

                    }
                
                }
                res.json(bestMatch);
                friendData.push(userInput);

        });
    };

    // Need to make sure this gets pushed to the page when user presses submit
    //write form validation for submit button, update survey.html with post ajax call data similar to restaurantApp