var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        for (var i = 0; i < friends.length; i++) {
            var userScores = req.body.scores
            var friendScores = friends[i].scores;
            var totalDifference = 0;
            for (var j = 0; j < userScores.length; j++) {
                var eachDiff = Math.abs(userScores[j] - friendScores[j]);
                totalDifference += eachDiff;
            };
            friends[i].totalDifference = totalDifference;
            console.log("Total difference for " + friends[i].name + ": " + totalDifference);
        };
        friends.sort(function(a, b){return a.totalDifference - b.totalDifference});
        var bestMatch = friends[0].name;
        console.log("Your best match is: " + bestMatch);
        friends.push(req.body);
        res.json(bestMatch);
    });

};